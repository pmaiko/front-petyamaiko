import api from '~/api'

import Default from '../layout/default'
import React, { useEffect, useState } from 'react'
import { BLOCKS } from '~/types'

const Home = () => {
  const [blocks, blocksSet] = useState([])

  const getPageData = async () => {

    const data : any = await api.fetchPageData('/home')

    blocksSet(data.sections)
  }

  useEffect(() => {
    getPageData()
  }, [])
  return (
    <Default>
      {blocks.map((section: any, index) : JSX.Element => {
        const component = BLOCKS[section.name]
        return React.createElement(component, {
          key: index
        })
      })}
    </Default>
  )
}

export default Home
