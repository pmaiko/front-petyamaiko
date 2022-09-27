import React from 'react'

const BaseTextField = React.forwardRef((props: any, ref: any) => {
  return (
    <div className={`${props.className} base-text-field ${props.error && ' base-text-field_error'}`}>
      {props.label &&
        <div className='base-text-field__label'>
          { props.label }
        </div>
      }

      <input
        {...props}
        ref={ref}
        className='base-text-field__input'
      />

      {props.error &&
        <div className='base-text-field__error'>
          {props.error}
        </div>
      }
    </div>
  )
})

export default BaseTextField
