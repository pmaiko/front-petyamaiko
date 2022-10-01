// https://tympanus.net/Development/CreativeLinkEffects/#cl-effect-10

const BaseButton = (props: any) => {
  return (
    <button
      {...props}
      data-hover={props.children}
      className={`base-button ${props.className || ''} ${props.theme ? `base-button_${props.theme}` : ''}`}
      onClick={props?.onClick}
    >
      <span>{props.children}</span>
    </button>
  )
}
export default BaseButton
