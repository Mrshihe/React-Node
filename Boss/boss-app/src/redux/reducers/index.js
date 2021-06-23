import { USER_LOGIN } from '../constant'

const defaultState = {
  name: '',
  type: ''
}

const reduce = (state=defaultState, action) => {
  switch(action.type){
    case USER_LOGIN:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default reduce