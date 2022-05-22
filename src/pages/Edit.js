import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

export default function Edit(props) {
  // form data state
  const [formData, setFormData] = useState({
    'title': '',
    'description': '',
    'day': '',
    'imageUrl': '',
    'isFestival': false // default
  })

  const { id } = useParams()

  // fetching the event of given id
  useEffect(() => {
    // making the request
    fetchEvent(id)
  }, [])

  // function to fetch the event of a given id
  async function fetchEvent(id) {
    // making the request
    const res = await api.get(`events/${id}`)

    // grabbing the event
    const event = res.data.data

    // updating the state
    setFormData({
      title: event.title,
      description: event.description ? event.description : '',
      day: event.day ? event.day : '',
      imageUrl: event.imageUrl ? event.imageUrl : '',
      isFestival: event.isFestival
    })
  }

  // loader state
  const [isLoading, setIsLoading] = useState(false)

  // function to handle change in form inputs
  function handleChange(e) {
    // getting the target's name and value
    const { name, value } = e.target
    
    // setting the state
    setFormData({
      ...formData, // copying the form data
      [name]: value, // setting the new data
    })
  }

  const navigate = useNavigate()

  // handling submit
  async function handleSubmit(e) {
    // preventing default
    e.preventDefault()

    // validating form data
    if (formData.title.trim().length === 0) {
      alert('Title is required!')
      return
    }

    // setting the loader state
    setIsLoading(true)

    try {
      // posting the data to the server
      const res = await api.patch(`events/${id}`, {
        title: formData.title,
        description: formData.description,
        day: formData.day,
        imageUrl: formData.imageUrl,
        isFestival: formData.isFestival
      })

      // resetting the fields
      setFormData({
        title: '',
        description: '',
        day: '',
        imageUrl: '',
        isFestival: false,
      })

      // navigating back to events
      navigate('/events')
    } catch (err) {
      console.log(err)
    } finally {
      // set the loader state
      setIsLoading(false)
    }
  }

  return (
    <div className='modal'>
      <div className='modal--content'>
        <form method='POST' action='#' className='edit-event--form' onSubmit={handleSubmit}>
          <input
            type='text'
            className='edit-event--form--input'
            placeholder='Enter Title'
            name='title'
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            type='text'
            className='edit-event--form--input edit-event--form--input--description'
            placeholder='Enter Description'
            name='description'
            onChange={handleChange}
            value={formData.description}
          >
          </textarea>
          <div className='edit-event--form--input-container'>
            <label htmlFor='date'>Enter date (optional)</label>
            <input
              id='date'
              type='date'
              className='edit-event--form--input edit-event--form--input--date'
              name='day'
              onChange={handleChange}
              style={{colorScheme: 'dark'}}
              value={formData.day}
            />
          </div>
          <div className='edit-event--form--input-container'>
            <label htmlFor='image'>Enter imageUrl (optional)</label>
            <input
              id='image'
              type='url'
              placeholder='e.g. https://something.com/23.jpg'
              className='edit-event--form--input'
              name='imageUrl'
              onChange={handleChange}
              value={formData.imageUrl}
            />
          </div>
          <div className='edit-event--form--input-container'>
            <label htmlFor='type'>Choose event type</label>
            <select
              id='type'
              className='edit-event--form--input edit-event--form--input--select'
              name='isFestival'
              onChange={handleChange}
              value={formData.isFestival}
            >
              <option value={false}>Event</option>
              <option value={true}>Festival</option>
            </select>
          </div>
          <input type='submit' value={isLoading ? 'SAVING...' : 'SAVE'} className='edit-event--form--submit' style={{position: 'unset'}} />
        </form>
      </div>
    </div>
  )
}