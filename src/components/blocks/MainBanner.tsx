import '../../assets/styles/blocks/MainBanner.scss'


// @ts-ignore
import img from '~/assets/images/petya.png'
// import svg from '~/assets/svg/code.svg'
import BaseButton from '~/components/base/BaseButton'
import BaseImage from '~/components/base/BaseImage'

const MainBanner = () => {
  return (
    <section className='main-banner'>
      <div className='container'>
        <div className='main-banner__image'>
          <BaseImage image={{ src: img }} />
        </div>
        <div className='main-banner__text'>
          <h1 className='main-banner__title'>
            <span className='text1'>Front-End</span> <span className='text2'>Developer</span> <br /> <span className='name'>Petro <br /> Maiko.</span>
          </h1>
          <h2 className='main-banner__description'>
            Building the best websites<br /> in the world!!!
          </h2>

          <BaseButton className='main-banner__button'>
            SEND REQUEST
          </BaseButton>
        </div>
      </div>
    </section>
  )
}

export default MainBanner
