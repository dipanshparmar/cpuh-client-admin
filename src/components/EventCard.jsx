export default function EventCard(props) {

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
          <p className='event-card--extras--button event-card--extras--button--delete'>Delete now</p>
          <p className='event-card--extras--button'>Edit</p>
        </div>
      </div>
    </div>
  )
}