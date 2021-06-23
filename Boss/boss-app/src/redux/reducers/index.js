import { USER_LOGIN, USER_LOGOUT } from '../constant'

const defaultState = {
  name: '',
  type: ''
}

const reduce = (state=defaultState, action) => {
  switch(action.type){
    case USER_LOGIN:
      return { ...state, ...action.payload }
    case USER_LOGOUT:
      return {...state}
    default:
      return state
  }
}

export default reduce