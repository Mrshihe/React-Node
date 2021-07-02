import { MESSAGE_LIST, MESSAGE_RECEIVE, MESSAGE_READ } from '../constant'

const defaultState = {
  messageList: [],
  messageUsers: {},
  unread: 0
}


const reduce = (state =defaultState, action) => {
  switch(action.type){
    case MESSAGE_LIST:
      // 消息未读且不是来自本人
      const unread = action.data.filter(v=>!v.isRead && v.from !== action.currentUserID ).length
      return { ...state , messageList: action.data, unread, messageUsers: action.users }
    case MESSAGE_RECEIVE:
      const n = action.data.from === action.currentUserID ? 0 : 1 
      return { ...state, messageList:[...state.messageList, action.data], unread: state.unread+n }
    case MESSAGE_READ:
      const { fromid, num } = action
      return { ...state, messageList: state.messageList.map(v=>{
        if(fromid === v.from) v.isRead = true
        return v
      }), unread: state.unread - num }
    default:
      return state
  }
}

export default reduce