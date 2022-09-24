const BaseButton = (props: any) => {
  return (
    <button className={`base-button ${props.className}`}>
      {props.children}
    </button>
  )
}
export default BaseButton
