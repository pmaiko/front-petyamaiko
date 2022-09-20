import { Link } from 'react-router-dom'

const TheMenu = () => {
  return (
    <nav className='menu'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='#'>Works</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default TheMenu
