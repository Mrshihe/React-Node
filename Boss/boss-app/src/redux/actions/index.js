import { USER_LOGIN, USER_LOGOUT } from '../constant'

export const userLoginAction = user => {
  return { type: USER_LOGIN, payload: user }
}

export const userLogoutAction = () => {
  return { type: USER_LOGOUT}
}