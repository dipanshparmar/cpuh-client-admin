import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import setLoginState from '../actions/setLoginState'

export default function Login() {
  // selector for login state
  const isLogged = useSelector(state => state)

  // dispatch
  const dispatch = useDispatch()

  // navigation
  const navigate = useNavigate()

  // login data state
  const [formData, setFormData] = useState({
    'username': '',
    'password': '',
  })

  // loading state
  const [isLoading, setIsLoading] = useState(false)

  // if I'm already logged then navigate to events
  useEffect(() => {
    // TODO: FIX THIS
    console.log(isLogged)
    if(isLogged) {
      return navigate('/events')
    }
  }, [])

  // function to handle the change
  function handleChange(e) {
    // getting the required values from the target
    const { name, value }  = e.target

    // setting the new data
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // function to handle the submit
  async function handleSubmit(e) {
    // preventing default
    e.preventDefault()

    // validating the form data
    if (formData.username.trim().length === 0) {
      alert('username can not be empty!')
      return
    }

    if (formData.password.trim().length === 0) {
      alert('password can not be empty!')
      return
    }

    // logging the user in
    try {
      // setting isloading to true
      setIsLoading(true)

      const res = await api.post('auth/login', {
        'username': formData.username,
        'password': formData.password,
      })

      // if res is 200 then we are authenticated
      if (res.status === 200) {
        // setting the logged state to true
        dispatch(setLoginState(true))

        // navigate the user to the home
        return navigate('/events', {replace: true})
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message)
        return
      }

      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='login'>
      <div className='login--form'>
        <p className='login--form--heading'>
          Welcome! Please login to continue
        </p>

        <form method='POST' action='#' onSubmit={handleSubmit}>
          <input type='text' placeholder='Username' className='login--form--input' name='username' value={formData.username} onChange={handleChange} />
          <input type='password' placeholder='Password' className='login--form--input' name='password' value={formData.password} onChange={handleChange} />
          <input type='submit' value={isLoading ? 'Logging In...' : 'Log In'} className='login--form--submit' style={isLoading ? {
            cursor: 'default',
            pointerEvents: 'none'
          }: {}} />
        </form>
      </div>
    </div>
  )
}