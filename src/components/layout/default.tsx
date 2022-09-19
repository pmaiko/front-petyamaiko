import TheHeader from '../shared/TheHeader'

export default (props: any) => {
  return (
    <div className='layout layout_default'>
      <TheHeader />
      {props.children}
    </div>
  )
}
