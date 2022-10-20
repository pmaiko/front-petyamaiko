import '../../assets/styles/blocks/MainBanner.scss'


// @ts-ignore
import image from '~/assets/images/petya-light.png'
import BaseButton from '~/components/base/BaseButton'
import BaseImage from '~/components/base/BaseImage'
import BaseAnimation from '~/components/base/BaseAnimation'

import gsap from 'gsap'
import Observer from '~/plugins/observer'

import { useEffect, useRef } from 'react'

const MainBanner = () => {
  const figure: any = useRef()
  const text: any = useRef()

  useEffect(() => {
    const imageElement = figure.current?.getElementsByTagName('img')

    const init = () => {
      gsap.set(figure.current, {
        opacity: 0
      })
      gsap.set(imageElement, {
        y: '45%'
      })
      gsap.set(text.current, {
        opacity: 0
      })
    }

    const onInView = () => {
      gsap.timeline()
        .delay(1.2)
        .addLabel('start')
        .to(figure.current, {
          opacity: 1,
          duration: 0.3
        }, 'start')
        .to(imageElement, {
          y: 0,
          delay: 0.5,
          duration: 1.5,
          ease: 'bounce.out' // expo.out
        }, 'start')
        .to(text.current, {
          opacity: 1
        }, '>-0.5')
    }

    const observer = new Observer({ root: null, rootMargin: '0px', threshold: 0 })
    observer.observe(figure.current)

    init()

    figure.current?.addEventListener('inview', onInView)
    return () => {
      figure.current?.removeEventListener('inview', onInView)
    }
  }, [])

  return (
    <section className='main-banner'>
      <div className='container'>
        <div className='main-banner__inner'>
          <div className='main-banner__col main-banner__col_left'>
            <BaseAnimation>
              <h1 className='main-banner__title'>
                Front-End Developer <br />
                Petya Maiko
              </h1>
            </BaseAnimation>
            <BaseAnimation delay={0.5}>
              <h6 className='main-banner__description'>
                Building the best websites in the world!!!
              </h6>
            </BaseAnimation>
            <BaseAnimation delay={1}>
              <BaseButton className='main-banner__button'>
                SEND REQUEST
              </BaseButton>
            </BaseAnimation>
          </div>
          <div className='main-banner__col main-banner__col_right'>
            <div
              ref={figure}
              className='main-banner__figure'
            >
              <div className='main-banner__figure-circle'>
                <div className='main-banner__figure-circle-inner'>
                  <div
                    ref={text}
                    className='main-banner__figure-circle-text h1'
                  >
                    HI!!!
                  </div>
                  <BaseImage image={{
                    src: image,
                    objectFit: 'contain',
                    lazy: false
                  }} />
                  <div className='main-banner__figure-circle-bg' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainBanner
