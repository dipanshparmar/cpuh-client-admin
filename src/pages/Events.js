import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
import AllEvents from './AllEvents'
import NewEvent from './NewEvent'

export default function Events() {
  return (
    <div className='events'>
      <div className='events--header'>
        <div className='events--header--section'>
          Create a new event
        </div>
        {/* TODO: active class will be given dynamically */}
        <div className='events--header--section active'>
          View active events
        </div>
      </div>

      <Routes>
        <Route path='/' element={<AllEvents />} />
        <Route path='/new' element={<NewEvent />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

