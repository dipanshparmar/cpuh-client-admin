import EventCard from '../components/EventCard'
import api from '../services/api'
import { useEffect, useState } from 'react'

export default function AllEvents() {
  // events state
  const [events, setEvents] = useState([])

  // loading state
  const [isLoading, setIsLoading] = useState(false)

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

  // function to get event cards
  function getEventCards() {
    // array to store the event cards
    const cards = events.map(event => {
      return (
        <EventCard
          key={events._id}
          id={events._id}
          title={event.title}
          description={event.description}
          day={event.day}
          imageUrl={event.imageUrl}
          isFestival={event.isFestival}
        />
      )
    })

    // returning the cards
    return cards
  }

  return (
    <div className='all-events'>
      <input type='text' className='all-events--search' placeholder='Search...' />
      {
        isLoading
        ? <p style={{alignSelf: 'center', color: 'white', margin: '2rem 0'}}>Loading...</p>
        : events.length === 0 ? <p style={{alignSelf: 'center', color: 'white', margin: '2rem 0'}}>No events!</p> : getEventCards()
      }
    </div>
  )
}
