import * as globalDataActions from '~/store/actions/globalDataActions'
import * as authActions from '~/store/actions/authActions'
import * as userActions from '~/store/actions/userActions'

export default {
  ...globalDataActions,
  ...authActions,
  ...userActions
}
