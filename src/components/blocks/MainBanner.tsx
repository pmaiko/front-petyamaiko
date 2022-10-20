import '../../assets/styles/blocks/MainBanner.scss'


// @ts-ignore
import image from '~/assets/images/petya-light.png'
// import svg from '~/assets/svg/code.svg'
import BaseButton from '~/components/base/BaseButton'
import BaseImage from '~/components/base/BaseImage'

const MainBanner = () => {
  return (
    <section className='main-banner'>
      <div className='container'>
        <div className='main-banner__inner'>
          <div className='main-banner__col main-banner__col_left'>
            <h1 className='main-banner__title'>
              Front-End Developer <br />
              Petya Maiko
            </h1>
            <h6 className='main-banner__description'>
              Building the best websites in the world!!!
            </h6>
            <BaseButton className='main-banner__button'>
              SEND REQUEST
            </BaseButton>
          </div>
          <div className='main-banner__col main-banner__col_right'>
            <div className='main-banner__figure'>
              <div className='main-banner__figure-circle'>
                <div className='main-banner__figure-circle-inner'>
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
