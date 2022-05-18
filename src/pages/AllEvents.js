import EventCard from '../components/EventCard'

export default function AllEvents() {
  return (
    <div className='all-events'>
      <input type='text' className='all-events--search' placeholder='Search...' />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  )
}
