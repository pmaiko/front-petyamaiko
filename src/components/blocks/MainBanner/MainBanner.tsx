import './MainBanner.scss'


// @ts-ignore
import img from '~/assets/images/petyamaiko.png'
import svg from '~/assets/svg/code.svg'
import BaseButton from '~/components/base/BaseButton'

const MainBanner = () => {
  return (
    <section className='main-banner'>
      <div className='container'>
        <article className='main-banner__content'>
          <h1 className='main-banner__title'>
            Front-End Developer <br /> Petro Maiko
          </h1>
          <h2 className='main-banner__description'>
            Building the best websites in the world.
          </h2>
          <BaseButton className='main-banner__button'>
            SEND REQUEST
          </BaseButton>
        </article>
        <div className='main-banner__photo'>
          <img
            src={img}
            alt='petyamaiko'
            className='main-banner__photo-img'
          />
          <img
            src={svg}
            alt='code'
            className='main-banner__photo-code'
          />
        </div>
      </div>
    </section>
  )
}

export default MainBanner
