import { useNavigate } from 'react-router-dom'

export default function EventCard(props) {
  // function to handle delete
  function handleDelete() {
    // asking if they are sure about this
    const confirmDelete = window.confirm('Are you sure?')

    if (!confirmDelete) {
      return
    }

    props.onDelete()
  }

  const navigate = useNavigate()

  // function to handle edit
  function handleEdit() {
    navigate(`/events/edit/${props.id}`)
  }

  return (
    <div className='event-card'>
      <p className='event-card--title'>{props.title}</p>
      <p className='event-card--description'>{props.description}</p>
      <div className='event-card--extras'>
        <div className='event-card--extras--info'>
          <p className='event-card--date'>
            Date: {props.day === null ? 'To be notified later': props.day}
          </p>
          {props.imageUrl && <p className='event-card--image-url'>
            Image URL: {props.imageUrl}
          </p>}
          <p className='event-card--type'>
            Type: {props.isFestival ? 'Festival': 'Event'}
          </p>
        </div>
        <div className='event-card--extras--buttons'>
          <p className='event-card--extras--button event-card--extras--button--delete' onClick={handleDelete}>Delete now</p>
          <p className='event-card--extras--button' onClick={handleEdit}>Edit</p>
        </div>
      </div>
    </div>
  )
}