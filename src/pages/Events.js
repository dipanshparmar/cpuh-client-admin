import { Link, Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
import AllEvents from './AllEvents'
import NewEvent from './NewEvent'
import { useState } from 'react'

export default function Events() {
  // active state for the events tab
  const [eventsIsActive, setEventsIsActive] = useState(true)

  return (
    <div className='events'>
      <div className='events--header'>
        <Link to='/events/new'>
          <div className={`events--header--section ${eventsIsActive ? '' : 'active'}`} onClick={() => setEventsIsActive(false)}>
              Create a new event
          </div>
        </Link>
        <Link to='/events'>
          <div className={`events--header--section ${eventsIsActive && 'active'}`} onClick={() => setEventsIsActive(true)}>
              View active events
          </div>
        </Link>
      </div>

      <Routes>
        <Route path='/' element={<AllEvents />} />
        <Route path='/new' element={<NewEvent />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

