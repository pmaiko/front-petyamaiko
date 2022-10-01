import './View.scss'

import { ReactComponent as ViewIcon } from '~/assets/svg/view-icon.svg'

const View = (props: any) => {
  return (
    <div className={`view ${props.className}`}>
      <ViewIcon /> {props.value || 0}
    </div>
  )
}

export default View
