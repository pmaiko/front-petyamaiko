import './About.scss'

import Default from '../../layout/default'

import { Link } from 'react-router-dom'

const About = () => {
  return (
    <Default>
      <div className='about'>
        About About About About About About About About About About About
        <div>
          <Link to='/'>link</Link>
        </div>
      </div>
    </Default>
  )
}

export default About
