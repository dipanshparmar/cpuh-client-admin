import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  // selector
  const isLogged = useSelector(state => state)

  // navigate
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='header' style={{justifyContent: !isLogged && 'center'}}>
      <h3 className='header--logo'>
        Career Point University Hamirpur
      </h3>
      {isLogged && <nav className='header--links'>
        <Link to='/events' className='header--link'>Events</Link>
        <Link to='/profile' className='header--link'>Profile</Link>
      </nav>}
    </div>
  )
}
