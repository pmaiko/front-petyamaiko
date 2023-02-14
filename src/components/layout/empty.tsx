import { Outlet } from 'react-router-dom'

const Empty = () => {
  return (
    <div className='layout layout_empty'>
      <div className='page-content max-h-100'>
        <Outlet />
      </div>
    </div>
  )
}

export default Empty
