const BaseButton = (props: any) => {
  return (
    <button
      {...props}
      className={`base-button ${props.className}`
    }>
      {props.children}
    </button>
  )
}
export default BaseButton
