import React, { useState, useContext, useEffect } from 'react'

const BreakpointContext = React.createContext({} as {
  breakpoints: T_Breakpoints
})

const breakpoints = {
  sm: 0,
  md: 768,
  lg: 1340,
  xl: 1920
}

const BreakpointProvider = ({ children }: any) => {
  const initialState: T_Breakpoints = {
    sm: false,
    md: false,
    lg: false,
    xl: false
  }

  const [state, setState] = useState(initialState)

  const handler = () => {
    const windowSize = window.innerWidth
    const _breakpoints = Object.entries(breakpoints)

    const newState: T_Breakpoints = { ...initialState }

    _breakpoints.forEach(([name, breakpoint], index) => {
      const [nextName, nextBreakpoint] = _breakpoints[index + 1] || []
      // console.log('name', name)
      // console.log('nextName', nextName)
      if (windowSize >= breakpoint && (windowSize < nextBreakpoint || !nextBreakpoint)) {
        newState[name as keyof T_Breakpoints] = true
      }
    })

    setState(newState)
  }

  useEffect(() => {
    handler()
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return (
    <BreakpointContext.Provider value={{
      breakpoints: state
    }}>
      { children }
    </BreakpointContext.Provider>
  )
}


export default BreakpointProvider
export const useBreakpoint = () => {
  return useContext<{breakpoints: T_Breakpoints}>(BreakpointContext)
}
export type T_Breakpoints = {
  sm: boolean,
  md: boolean,
  lg: boolean,
  xl: boolean
}

// const someObj: ObjectType = data
// const field = 'username'
//
// // This gives an error
// const temp = someObj[field]
//
// // Solution 1: When the type of the object is known
// const temp = someObj[field as keyof ObjectType]
//
// // Solution 2: When the type of the object is not known
// const temp = someObj[field as keyof typeof someObj]
