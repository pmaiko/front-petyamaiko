import Default from '../layout/default'
import HomeBanner from '~/components/blocks/MainBanner'
import Projects from '~/components/blocks/Projects'

const Home = () => {
  return (
    <Default>
      <HomeBanner />
      <Projects />
    </Default>
  )
}

export default Home
