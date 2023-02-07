// types
import { PageData, BLOCKS } from '~/types'

import api from '~/api'

import { createEvent } from '~/helpers/create-event'
import { Suspense, createElement, useEffect, useState, useMemo } from 'react'
import { useStoreActions } from '~/store'

import SuspenseLoader from '~/components/shared/SuspenseLoader'

const appProgressEvent = createEvent('app:progress')

const Home = () => {
  const [blocks, blocksSet] = useState<any>([])
  const [blocksLoadedCount, blocksLoadedCountSet] = useState(0)
  const [isLoadedPageData, isLoadedPageDataSet] = useState(false)

  const { setLoadedPage } = useStoreActions()

  const getPageData = async () => {
    const pageData:PageData = await api.fetchPageData('/home')
    blocksSet(pageData.blocks)
  }

  const blocksFiltered = useMemo(() => {
    return blocks.filter((block: any, index: any) => BLOCKS[block.name])
  }, [blocks])

  const blocksFilteredLength = useMemo(() => {
    return blocksFiltered.length
  }, [blocksFiltered])

  const isLoadedAllBlocks = useMemo(() => {
    return blocksLoadedCount >= blocksFilteredLength
  }, [blocksFilteredLength, blocksLoadedCount])

  useEffect(() => {
    getPageData().finally(() => {
      isLoadedPageDataSet(true)
      document.documentElement.dispatchEvent(appProgressEvent)
    })
  }, [])

  useEffect(() => {
    if (isLoadedAllBlocks) {
      document.documentElement.dispatchEvent(appProgressEvent)
    }
  }, [isLoadedAllBlocks])

  useEffect(() => {
    if (isLoadedPageData && isLoadedAllBlocks) {
      setLoadedPage(true)
    }
  }, [isLoadedPageData, isLoadedAllBlocks])

  return (
    <>
      {blocks.map((block: any, index: any) : JSX.Element => {
        const component = BLOCKS[block.name]
        if (component) {
          return createElement(Suspense, {
            key: index,
            children: createElement(SuspenseLoader, {
              children: createElement(component, {
                ...block.attributes
              }),

              onLoad: () => {
                blocksLoadedCountSet((prev) => {
                  return prev + 1
                })
              }
            })
          })
        }

        return <span key={index} style={{ color: 'red', fontSize: '2em', marginBottom: '0.5em' }}>Not Found {block.name}</span>
      })}
    </>
  )
}

export default Home
