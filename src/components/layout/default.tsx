import TheHeader from '../shared/TheHeader/TheHeader'

const Default = (props: any) => {
  return (
    <div className='layout layout_default'>
      <TheHeader />
      <div className='container'>
        {props.children}
      </div>
    </div>
  )
}

export default Default
