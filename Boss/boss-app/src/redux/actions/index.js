import axios from 'axios'
import io from 'socket.io-client'
import { USER_LOGIN, USER_LOGOUT, MESSAGE_LIST, MESSAGE_RECEIVE, MESSAGE_READ } from '../constant'

const socket = io('ws://localhost:9000')




export const userLoginAction = user => {
  return { type: USER_LOGIN, payload: user }
}

export const userLogoutAction = () => {
  return { type: USER_LOGOUT}
}


export const sendMsg = ({from,content,to}) => {
  return dispatch => {
    socket.emit('sendmsg',{from,content,to})
  }
}

export const receiveMsg = (path) => {
  return (dispatch,getState) => {
    const currentUserID = getState().user._id
    socket.on('recvmsg',function(data){
      dispatch({type:MESSAGE_RECEIVE,data,currentUserID,path})
    })
  }
}

export const stopRece = () => {
  return dispatch => {
    socket.removeAllListeners("recvmsg");
  }
}

export const getMessageList = id => {
  return (dispatch,getState) => {
    const currentUserID = getState().user._id
    axios.get(`/user/msglist`,{params:{ talkid: id}}).then(res => {
      if(res.data.code===0){
        const { data, users } = res.data
        dispatch({ type:MESSAGE_LIST, data, users, currentUserID })
      }
    })
  } 
}

export const readMsg = fromid => {
  return dispatch => {
    axios.post(`/user/readmsg`,{ fromid }).then(res=>{
      if(res.data.code === 0){
        dispatch({type: MESSAGE_READ, fromid, num:res.data.data})
      }
    })
  }
}