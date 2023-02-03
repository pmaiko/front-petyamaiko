import TheHeader from '../shared/TheHeader'
import TheFooter from '../shared/TheFooter'

const Default = (props: any) => {
  return (
    <div className='layout layout_default'>
      <TheHeader />
      <div className='page-content'>
        {props.children}
      </div>
      <TheFooter />
    </div>
  )
}

export default Default
