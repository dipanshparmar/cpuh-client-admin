import EventCard from '../components/EventCard'
import api from '../services/api'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AllEvents() {
  // events state
  const [events, setEvents] = useState([])

  // loading state
  const [isLoading, setIsLoading] = useState(false)

  // state for serch
  const [searchQuery, setSearchQuery] = useState('')

  // selector
  const isLogged = useSelector(state => state)

  // navigate
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged) {
      navigate('/login')
    }
  }, [])

  // function to handle search query change
  function handleChange(e) {
    // grabbing the value
    const { value } = e.target

    // updating the query
    setSearchQuery(value)
  }

  // fetching the events from the api
  useEffect(() => {
    setIsLoading(true)

    // setting the evets
    fetchEvents()
  }, [])

  // function to fetch and set events
  async function fetchEvents() {
    try {
      const res = await api.get('events')
      const data = res.data.data

      // setting the events
      setEvents(data.reverse())
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  } 

  // function to delete an event
  async function deleteEvent(id) {
    // making a delete request to the server
    try {
      const res = await api.delete(`events/${id}`)

      // grabbing the new array set
      const data = res.data.data

      // setting the new data
      setEvents(data)
    } catch (err) {
      console.log(err)
    }
  }

  // function to get event cards
  function getEventCards(data) {
    // array to store the event cards
    const cards = data.map(event => {
      return (
        <EventCard
          key={event._id}
          id={event._id}
          title={event.title}
          description={event.description}
          day={event.day}
          imageUrl={event.imageUrl}
          isFestival={event.isFestival}
          onDelete={() => deleteEvent(event._id)}
          updateEvents={setEvents}
        />
      )
    })

    // returning the cards
    return cards
  }

  // function to get search results
  function getSearchResults() {
    return getEventCards(events.filter(event => {
      if (event.title.includes(searchQuery)) {
        return true
      }

      // if event has a description then search there as well
      if (event.description) {
        return event.description.includes(searchQuery)
      }

      return false
    }))
  }

  // function to delete all the events
  async function handleDelete() {
    try {
      // making a request to delete all the events
      await api.delete('events')

      // setting the events to an empty list
      setEvents([])
    } catch (err) {
      // if there is an error
      console.log(err)
    }
  }

  return (
    <div className='all-events'>
      <input
        type='text'
        className='all-events--search'
        placeholder='Search...'
        value={searchQuery}
        onChange={handleChange}
      />
      {
        isLoading
        ? <p style={{alignSelf: 'center', color: 'white', margin: '2rem 0'}}>Loading...</p>
        : events.length === 0
          ? <p style={{alignSelf: 'center', color: 'white', margin: '2rem 0'}}>No events!</p>
          : searchQuery
            ? getSearchResults().length === 0
              ? <p style={{alignSelf: 'center', color: 'white', margin: '2rem 0'}}>No search results found!</p>
              : getSearchResults()
            : getEventCards(events)
      }

      {/* showing the delete only button only if there are events */}
      {events.length !== 0 && <button className='all-events--delete' onClick={() => {
        if (window.confirm('Are you sure you want to delete all the events?')) {
          handleDelete()
        }
      }}>delete all</button>}
    </div>
  )
}
