import Default from '../layout/default'

import { Link } from 'react-router-dom'

export default () => {
  function ls () {
    return 1 + 2
  }

  const as = {
    a: 1,
    b: 2
  }

  const { a, b } = as

  console.log(a, b)
  console.log(ls)

  return (
    <Default>
      <div>
        About About About About About About About About About About About
        <div>
          <Link to='/'>link</Link>
        </div>
      </div>
    </Default>
  )
}
