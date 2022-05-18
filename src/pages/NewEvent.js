export default function NewEvent() {
  return (
    <div className='new-event'>
      <form className='new-event--form'>
        <input type='text' className='new-event--form--input' placeholder='Enter Title' />
        <div className='separator new-event--form--separator'></div>
        <textarea type='text' className='new-event--form--input new-event--form--input--description' placeholder='Enter Description'></textarea>
        <div className='separator new-event--form--separator'></div>  
        <div className='new-event--form--row'>
          <div className='new-event--form--input-container'>
            <label htmlFor='date'>Enter date (optional)</label>
            <input id='date' type='date' className='new-event--form--input new-event--form--input--date' />
          </div>
          <div className='new-event--form--input-container'>
            <label htmlFor='image'>Enter Image URL (optional)</label>
            <input id='image' type='text' placeholder='e.g. https://something.com/23.jpg' className='new-event--form--input' />
          </div>
          <div className='new-event--form--input-container'>
            <label htmlFor='type'>Choose event type</label>
            <select id='type' className='new-event--form--input new-event--form--input--select'>
              <option value='event'>Event</option>
              <option value='festival'>Festival</option>
            </select>
          </div>
        </div>
        <input type='submit' value='SAVE' className='new-event--form--submit' />
      </form>
    </div>
  )
}
