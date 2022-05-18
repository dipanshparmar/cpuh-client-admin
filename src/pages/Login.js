export default function Login() {
  return (
    <div className='login'>
      <div className='login--form'>
        <p className='login--form--heading'>
          Welcome! Please login to continue
        </p>

        <form>
          <input type='text' placeholder='Username' className='login--form--input' />
          <input type='password' placeholder='Password' className='login--form--input' />
          <input type='submit' value='Log In' className='login--form--submit' />
        </form>
      </div>
    </div>
  )
}