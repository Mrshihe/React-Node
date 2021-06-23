import { USER_LOGIN } from '../constant'

export const userLoginAction = user => {
  return { type: USER_LOGIN, payload: user }
}