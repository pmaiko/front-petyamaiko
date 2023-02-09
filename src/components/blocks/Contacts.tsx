import '~/assets/styles/blocks/Contacts.scss'

import { useRef } from 'react'
import { useComponentLoaded } from '~/hooks/useComponentLoaded'

import BaseAnimation from '~/components/base/BaseAnimation'
import BaseImage from '~/components/base/BaseImage'

const Contacts = (props: {
  title: string,
  list: [
    {
      image: string,
      label: string,
      value: string
    }
  ]
}) => {
  const { title, list } = props

  useComponentLoaded(props)

  const root: any = useRef()

  return (
    <section
      ref={root}
      className='contacts base-section'
    >
      <div className='container'>
        <BaseAnimation className='base-title'>
          <h2>
            { title }
          </h2>
        </BaseAnimation>

        <ul className='contacts__list'>
          {list.map((item, index) => (
            <li
              key={index}
              className='contacts__list-item'
            >
              <BaseAnimation delay={0.3 * index}>
                <div className='contacts__list-item-inner'>
                  <div className='contacts__list-image'>
                    <BaseImage
                      image={{
                        src: item.image,
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  <div className='contacts__list-content'>
                    <h4 className='contacts__list-label bold'>
                      { item.label }
                    </h4>
                    <p className='contacts__list-description h6'>
                      { item.value }
                    </p>
                  </div>
                </div>
              </BaseAnimation>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Contacts
