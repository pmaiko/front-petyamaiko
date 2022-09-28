const BaseButton = (props: any) => {
  return (
    <button
      {...props}
      className={`base-button ${props.className || ''} ${props.theme ? `base-button_${props.theme}` : ''}`}
      onClick={props?.onClick}
    >
      {props.children}
    </button>
  )
}
export default BaseButton
