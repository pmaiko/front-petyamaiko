import { useEffect } from 'react'

const Spinner = ({ mounted, beforeUnmount }: {
  mounted?: (...args: any[]) => void | Promise<any>,
  beforeUnmount?: (...args: any[]) => void | Promise<any>
}) => {
  useEffect(() => {
    if (mounted) {
      mounted()
    }

    return () => {
      if (beforeUnmount) {
        beforeUnmount()
      }
    }
  }, [])
  return (
    <svg className='spinner' viewBox='0 0 50 50'>
      <circle
        className='path' cx='25' cy='25' r='20'
        fill='none'
        strokeWidth='5'
      />
    </svg>
  )
}
export default Spinner
