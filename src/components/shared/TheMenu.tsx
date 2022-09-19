import { Link } from 'react-router-dom'

export default () => {
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
