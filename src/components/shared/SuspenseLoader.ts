import { useEffect } from 'react'

const SuspenseLoader = ({ children, onLoad }: {
  children: any,
  onLoad: () => void
}) => {
  useEffect(() => {
    onLoad()
  }, [])
  return children
}

export default SuspenseLoader
