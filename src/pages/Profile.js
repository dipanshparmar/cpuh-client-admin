export default function Profile() {
  return (
    <div className='profile'>
      <h3 className='profile--greeting'>Hello Admin!</h3>
      <form className='profile--row'>
        <input type='text' className='profile--input' placeholder='New username' />
        <input type='submit' className='profile--submit' value='UPDATE USERNAME' />
      </form>
      <div className='profile--separator separator'></div>
      <form className='profile--form'>
        <div className='profile--row'>
          <input type='text' className='profile--input' placeholder='Current password' />
          <input type='text' className='profile--input' placeholder='New password' />
        </div>
        <div className='profile--row'>
          <input type='text' className='profile--input' placeholder='Confirm new password' />
          <input type='submit' value='UPDATE PASSWORD' className='profile--submit update-pass' />
        </div>
      </form>
    </div>
  )
}