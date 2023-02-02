import '~/assets/styles/blocks/Services.scss'

import BaseAnimation from '~/components/base/BaseAnimation'
import BaseImage from '~/components/base/BaseImage'

import gsap from '~/plugins/gsap'
import { useEffect, useRef } from 'react'

const Services = ({ title, list }: {
  title: string,
  list: [{
    image: string,
    label: string,
    description: string
  }]
}) => {
  const root: any = useRef()
  useEffect(() => {
    const container = root.current?.getElementsByClassName('container')
    const images = root.current?.getElementsByClassName('services-card__image')

    const timeline = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: root.current,
        start: 'top center',
        scrub: 1
      }
    })

    timeline
      .addLabel('start')
      .from(images, {
        scale: 2,
        y: 30,
        rotate: 45
      })
      .to(images, {
        scale: 1,
        y: 0,
        rotate: 0
      })
  }, [])

  return (
    <section
      ref={root}
      className='services base-section'
    >
      <div className='container'>
        <BaseAnimation className='base-title'>
          <h2>
            { title }
          </h2>
        </BaseAnimation>
        <ul className='services__list'>
          {list.map((item, index) => (
            <li
              key={index}
              className='services__list-item'
            >
              <div className='services-card'>
                <div className='services-card__image'>
                  <BaseImage
                    image={{ src: item.image }}
                  />
                </div>

                <BaseAnimation className='w-auto'>
                  <h3 className='services-card__label'>
                    { item.label }
                  </h3>
                </BaseAnimation>

                <BaseAnimation className='w-auto'>
                  <p className='services-card__description'>
                    { item.description }
                  </p>
                </BaseAnimation>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Services
