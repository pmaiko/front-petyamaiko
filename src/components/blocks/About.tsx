import '~/assets/styles/blocks/About.scss'

import BaseAnimation from '~/components/base/BaseAnimation'
import BaseImage from '~/components/base/BaseImage'
import BaseButton from '~/components/base/BaseButton'
import { replaceUrl } from '~/helpers/replace-url'

const About = ({ title, label, description, image, buttonText, buttonLink }: {
  title: string,
  label: string,
  description: string,
  image: string,
  buttonText: string,
  buttonLink: string
}) => {
  return (
    <section className='about base-section'>
      <div className='container'>
        <BaseAnimation className='base-title'>
          <h2>
            { title }
          </h2>
        </BaseAnimation>

        <div className='about__content'>
          <div className='about__content-col about__content-col_left'>
            <div className='about__image'>
              <BaseImage
                image={{
                  src: image,
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
          <div className='about__content-col about__content-col_right'>
            <BaseAnimation className='about__label'>
              <h3>
                { label }
              </h3>
            </BaseAnimation>
            <BaseAnimation
              className='about__description'
              animation='from-opacity'
            >
              <div className='editor' dangerouslySetInnerHTML={{ __html: description }} />
            </BaseAnimation>
            <a
              href={replaceUrl(buttonLink)} download={true}
            >
              <BaseAnimation>
                <BaseButton
                  className='about__button'
                >
                  { buttonText }
                </BaseButton>
              </BaseAnimation>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
