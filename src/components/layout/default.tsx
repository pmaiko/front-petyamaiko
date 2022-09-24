import TheHeader from '../shared/TheHeader/TheHeader'

const Default = (props: any) => {
  return (
    <div className='layout layout_default'>
      <TheHeader />
      {props.children}
    </div>
  )
}

export default Default
