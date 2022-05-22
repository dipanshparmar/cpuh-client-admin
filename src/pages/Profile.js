import { useState } from 'react'
import api from '../services/api'

export default function Profile() {
  // form data
  const [username, setUsername] = useState('')

  // loading state
  const [isLoading, setIsLoading] = useState(false)

  // loading state for password
  const [passwordIsLoading, setPasswordIsLoading] = useState(false)

  // handle username change
  function handleUsernameChange(e) {
    // setting the username
    setUsername(e.target.value)
  }

  // handle username submit
  async function handleUsernameSubmit(e) {
    // preventing default
    e.preventDefault()

    // if username is empty then return
    if (username.trim().length === 0) {
      return alert('username can not be empty!')
    }

    // setting isloading
    setIsLoading(true)

    try {
      // making the api request
      const res = await api.post('auth/update-username', {
        newUsername: username
      })

      // if ok
      if (res.status === 200) {
        console.log('username updated successfully!')
      }
    } catch (err) {
      // logging the error
      if (err.response) {
        console.log(err.response.data.message)
        return
      }

      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  // password state
  const [passwordForm, setPasswordForm] = useState({
    'existingPassword': '',
    'newPassword': '',
    'confirmNewPassword': ''
  })

  // function to handle password changes
  async function handlePasswordChanges(e) {
    // getting the required properties
    const { name, value } = e.target

    // updating the data
    setPasswordForm({
      ...passwordForm,
      [name]: value
    })
  }

  // function to submit the password
  async function handlePasswordsSubmit(e) {
    // preventing default
    e.preventDefault()

    // validating data
    if (passwordForm.existingPassword.trim().length === 0) {
      return alert('current password can not be empty!')
    }

    if (passwordForm.newPassword.trim().length === 0) {
      return alert('New password can not be empty!')
    }

    if (passwordForm.newPassword != passwordForm.confirmNewPassword) {
      return alert('Passwords do not match!')
    }

    setPasswordIsLoading(true)

    // making a post request
    try {
      const res = await api.post('auth/update-pass', {
        existingPassword: passwordForm.existingPassword,
        newPassword: passwordForm.newPassword,
        confirmNewPassword: passwordForm.confirmNewPassword
      })

      console.log(res)

      // deleting the values of the fields
      passwordForm.existingPassword = ''
      passwordForm.existingPassword = ''
      passwordForm.confirmNewPassword = ''
    } catch (err) {
      console.log(err)
    } finally {
      setPasswordIsLoading(false)
    }
  }

  return (
    <div className='profile'>
      <h3 className='profile--greeting'>Hello Admin!</h3>
      <form className='profile--row' method='POST' onSubmit={handleUsernameSubmit}>
        <input
          type='text'
          className='profile--input'
          placeholder='New username'
          value={username}
          onChange={handleUsernameChange}
        />
        <input type='submit' className='profile--submit' value={isLoading  ? 'UPDATING USERNAME...' : 'UPDATE USERNAME'} />
      </form>
      <div className='profile--separator separator'></div>
      <form className='profile--form' method='POST' onSubmit={handlePasswordsSubmit}>
        <div className='profile--row'>
          <input
            type='text'
            className='profile--input'
            placeholder='Current password'
            value={passwordForm.existingPassword}
            name='existingPassword'
            onChange={handlePasswordChanges}
          />
          <input
            type='text'
            className='profile--input'
            placeholder='New password'
            value={passwordForm.newPassword}
            name='newPassword'
            onChange={handlePasswordChanges}
          />
        </div>
        <div className='profile--row'>
          <input 
            type='text'
            className='profile--input'
            placeholder='Confirm new password'
            value={passwordForm.confirmNewPassword}
            name='confirmNewPassword'
            onChange={handlePasswordChanges}
          />
          <input type='submit' value={passwordIsLoading ? 'UPDATING PASSWORD...' : 'UPDATE PASSWORD'} className='profile--submit update-pass' />
        </div>
      </form>
    </div>
  )
}