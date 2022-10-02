import React from 'react'

const BaseTextarea = React.forwardRef((props: any, ref: any) => {
  return (
    <div className={`${props.className} base-textarea ${props.error && ' base-textarea_error'}`}>
      {props.label &&
        <div className='base-textarea__label'>
          { props.label }
        </div>
      }

      <textarea
        {...props}
        ref={ref}
        className='base-textarea__input'
      />

      {props.error &&
        <div className='base-textarea__error'>
          {props.error}
        </div>
      }
    </div>
  )
})

export default BaseTextarea
