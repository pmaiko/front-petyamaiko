import './TheHeader.scss'

import TheMenu from '../TheMenu'

const TheHeader = () => {
  return (
    <header className='header'>
      <div className='container'>
        <TheMenu />
      </div>
    </header>
  )
}

export default TheHeader

