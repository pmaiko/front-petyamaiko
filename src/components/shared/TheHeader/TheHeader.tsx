import './TheHeader.scss'

import TheNav from '~/components/shared/TheNav/TheNav'

const TheHeader = () => {
  return (
    <header className='header'>
      <div className='container'>
        <TheNav />
      </div>
    </header>
  )
}

export default TheHeader

