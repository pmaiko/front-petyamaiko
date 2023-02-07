import { isElement } from 'lodash'
import { createEvent } from '~/helpers/create-event'

import globalStore from '~/globalStore'

interface IEVENTS {
  INVIEW: string
  OUTVIEW: string
}
const EVENTS: IEVENTS = {
  INVIEW: 'inview',
  OUTVIEW: 'outview'
}

export default class Observer {
  public observe: any
  public unobserve: any

  constructor (settings: any) {
    const callback = (entries: any, obs: any) => {
      for (const entry of entries) {
        const options = {
          repeat: false
        }

        Object.assign(options, getDataOptions(entry.target.dataset))

        if (!entry.isIntersecting) {
          entry.target.dispatchEvent(events.OUTVIEW)
        } else {
          entry.target.dispatchEvent(events.INVIEW)
          if (!options.repeat) {
            obs.unobserve(entry.target)
          }
        }
      }
    }

    const observer = new IntersectionObserver(callback, settings)
    const events = {
      INVIEW: 'inview',
      OUTVIEW: 'outview'
    }

    this.observe = (el: any) => {
      if (isElement(el)) {
        if (!globalStore.state.preloaderDone) {
          globalStore.watch('preloaderDone', (newValue) => {
            if (newValue) {
              observer.observe(el)
            }
          })
        } else {
          observer.observe(el)
        }
      } else {
        console.error(`Intersection Observer: ${el} is not DOM element!`)
      }
    }

    this.unobserve = (el: any) => {
      if (isElement(el)) {
        observer.unobserve(el)
      } else {
        console.error(`Intersection Observer: ${el} is not DOM element!`)
      }
    }

    const getDataOptions = (dataset: any) => {
      return {
        // add data-observer-repeat='true' for prevent unobserve
        repeat: dataset.observerRepeat === 'true'
      }
    }

    const initEvents = () => {
      Object.keys(EVENTS).forEach((eventName) => {
        // @ts-ignore
        events[eventName] = createEvent(EVENTS[eventName])
      })
    }

    initEvents()
  }
}
