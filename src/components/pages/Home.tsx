// types
import { PageData, BLOCKS } from '~/types'

import api from '~/api'
import { createElement, useEffect, useState } from 'react'

const Home = () => {
  const [blocks, blocksSet] = useState<any>([])

  const getPageData = async () => {

    const pageData:PageData = await api.fetchPageData('/home')
    blocksSet(pageData.blocks)
  }

  useEffect(() => {
    getPageData()
  }, [])


  return (
    <>
      {blocks.map((block: any, index: any) : JSX.Element => {
        const component = BLOCKS[block.name]
        if (component) {
          return createElement(component, {
            key: index,
            ...block.attributes
          })
        }

        return <span key={index} style={{ color: 'red', fontSize: '2em', marginBottom: '0.5em' }}>Not Found {block.name}</span>
      })}
    </>
  )
}

export default Home
