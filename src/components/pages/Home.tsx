// types
import { PageData, BLOCKS } from '~/types'

import { createElement, useEffect, useState, useMemo } from 'react'
import { useAppLoaded } from '~/hooks/useAppLoaded'
import { useLoaderData } from 'react-router-dom'

const Home = () => {
  const [blocksLoadedCount, setBlocksLoadedCount] = useState(0)
  const [isLoadedPageData, setIsLoadedPageData] = useState(false)

  const {
    setLoadedPage,
    dispatchAppProgressEvent,
    SuspenseLoader
  } = useAppLoaded()

  const { blocks } = useLoaderData() as PageData

  const existingBlocks = useMemo(() => {
    return blocks.filter((block: any, index: any) => BLOCKS[block.name])
  }, [blocks])

  useEffect(() => {
    setIsLoadedPageData(true)
    dispatchAppProgressEvent()
  }, [])

  useEffect(() => {
    const isLoadedAllBlocks = blocksLoadedCount >= existingBlocks.length
    if (isLoadedPageData && isLoadedAllBlocks) {
      setLoadedPage(true)
    }
  }, [isLoadedPageData, blocksLoadedCount])

  return (
    <>
      {blocks.map((block: any, index: any) : JSX.Element => {
        const component = BLOCKS[block.name]
        if (component) {
          return createElement(SuspenseLoader, {
            key: index,
            onLoaded: () => {
              setBlocksLoadedCount((prev) => {
                return prev + 1
              })
            },
            children: createElement(component, {
              ...block.attributes
            })
          })
        }

        return <span key={index} style={{ color: 'red', fontSize: '2em', marginBottom: '0.5em' }}>Not Found {block.name}</span>
      })}
    </>
  )
}

export default Home
