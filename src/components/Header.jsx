import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header'>
      <h3 className='header--logo'>
        Career Point University Hamirpur
      </h3>
      <nav className='header--links'>
        <Link to='/events' className='header--link'>Events</Link>
        <Link to='/profile' className='header--link'>Profile</Link>
      </nav>
    </div>
  )
}
