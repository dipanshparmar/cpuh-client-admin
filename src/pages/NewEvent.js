import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function NewEvent() {
  // form data state
  const [formData, setFormData] = useState({
    'title': '',
    'description': '',
    'day': '',
    'imageUrl': '',
    'isFestival': false // default
  })

  // selector
  const isLogged = useSelector(state => state)

  // navigate
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged) {
      navigate('/login')
    }
  }, [])

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
      const res = await api.post('events', {
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
    } catch (err) {
      // if there is response
      if (err.response) {
        return alert(err.response.data.message)
      }

      alert(err)
    } finally {
      // set the loader state
      setIsLoading(false)
    }
  }

  return (
    <div className='new-event'>
      <form method='POST' action='#' className='new-event--form' onSubmit={handleSubmit}>
        <input
          type='text'
          className='new-event--form--input'
          placeholder='Enter Title'
          name='title'
          onChange={handleChange}
          value={formData.title}
          autoFocus={true}
        />
        <div className='separator new-event--form--separator'></div>
        <textarea
          type='text'
          className='new-event--form--input new-event--form--input--description'
          placeholder='Enter Description'
          name='description'
          onChange={handleChange}
          value={formData.description}
        >
        </textarea>
        <div className='separator new-event--form--separator'></div>  
        <div className='new-event--form--row'>
          <div className='new-event--form--input-container'>
            <label htmlFor='date'>Enter date (optional)</label>
            <input
              id='date'
              type='date'
              className='new-event--form--input new-event--form--input--date'
              name='day'
              onChange={handleChange}
              value={formData.day}
            />
          </div>
          <div className='new-event--form--input-container'>
            <label htmlFor='image'>Enter imageUrl (optional)</label>
            <input
              id='image'
              type='url'
              placeholder='e.g. https://something.com/23.jpg'
              className='new-event--form--input'
              name='imageUrl'
              onChange={handleChange}
              value={formData.imageUrl}
            />
          </div>
          <div className='new-event--form--input-container'>
            <label htmlFor='type'>Choose event type</label>
            <select
              id='type'
              className='new-event--form--input new-event--form--input--select'
              name='isFestival'
              onChange={handleChange}
              value={formData.isFestival}
            >
              <option value={false}>Event</option>
              <option value={true}>Festival</option>
            </select>
          </div>
        </div>
        <input type='submit' value={isLoading ? 'SAVING...' : 'SAVE'} className='new-event--form--submit' style={isLoading ? {
          cursor: 'default',
          pointerEvents: 'none'
        }: {}} />
      </form>
    </div>
  )
}
