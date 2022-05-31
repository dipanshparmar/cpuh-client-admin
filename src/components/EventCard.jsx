import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function EventCard(props) {
  // function to handle delete
  async function handleDelete() {
    // asking if they are sure about this
    const confirmDelete = window.confirm('Are you sure?')

    if (!confirmDelete) {
      return
    }

    // setting is deleting to true
    setIsDeleting(true)

    // deleting the event
    await props.onDelete()

    // setting isdeleting to false
    setIsDeleting(false)
  }

  // delete button state
  const [isDeleting, setIsDeleting] = useState(false)

  const navigate = useNavigate()

  // function to handle edit
  function handleEdit() {
    navigate(`/events/edit/${props.id}`)
  }

  return (
    <div className='event-card'>
      <p className='event-card--title'>{props.title}</p>
      <p className='event-card--description'>{props.description}</p>
      <div className='event-card--extras--info'>
        <p className='event-card--date'>
          Date: {props.day === null ? 'To be notified later': props.day}
        </p>
        <p className='event-card--type'>
          Type: {props.isFestival ? 'Festival': 'Event'}
        </p>
        {props.imageUrl && <a className='event-card--image-url' href={props.imageUrl} target='_blank'>
          {props.imageUrl}
        </a>}
      </div>
      <div className='event-card--extras--buttons'>
        <p className='event-card--extras--button event-card--extras--button--delete' onClick={handleDelete} style={isDeleting ? {
          cursor: 'default',
          pointerEvents: 'none'
        }: {}}>{isDeleting ? 'Deleting...' : 'Delete now'}</p>
        <p className='event-card--extras--button' onClick={handleEdit}>Edit</p>
      </div>
    </div>
  )
}