export default function EventCard() {
  return (
    <div className='event-card'>
      <p className='event-card--title'>This is a heading</p>
      <p className='event-card--description'>This is the text for the event! This will grow bigger and bigger and bigger and bigger. This can be of any length but we will limit it to two lines only. Modal should pop when clicked. This is the text for the event! This will grow bigger and bigger and bigger and bigger. This can be of any length but we will limit it to two lines only. Modal should pop when clicked</p>
      <div className='event-card--extras'>
        <div className='event-card--extras--info'>
          <p className='event-card--date'>
            Date: 29/2/2001
          </p>
          <p className='event-card--image-url'>
            Image URL: http://bigbigurl.com/../..
          </p>
          <p className='event-card--type'>
            Type: event
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