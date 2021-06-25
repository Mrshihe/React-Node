import React from 'react'
import { Input, Button } from 'antd'
import io from 'socket.io-client'
import axios from 'axios'
import { connect } from 'react-redux'
const socket = io('ws://localhost:9000')
class Chat extends React.Component{
  state = {
    text: '',
    message: []
  }
  inputChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  sendMessage = () =>{
    const content = this.state.text
    const from = this.props.user['_id']
    const to = this.props.match.params.userid
    socket.emit('sendmsg',{from,content,to})
    this.setState({ text: '' })
  }
  getMessageList = () => {
    axios.get(`/user/msglist`).then(res =>{
      if(res.data.code===0){
        if(this._isMounted){
          this.setState({
            message:[...this.state.message,...res.data.data]
          })
        }
      }
    })
  }
  componentDidMount(){
    this._isMounted = true
    this.getMessageList()
    socket.on('recvmsg', data => {
      const { message } = this.state
      if(this._isMounted){
        this.setState({
          message: [...message, ...data]
        })
      }
    })
  }
  componentWillUnmount(){
    this._isMounted = false
  }
  render(){
    const { userid } = this.props.match.params
    return (
      <div className="chatWrapper">
        chat页面{userid}
        {
          this.state.message.map(v=>{
            return <p key={v._id}>{v.content}</p>
          })
        }
        <div className="chatSend">
          <div className="chatInput"><Input value={ this.state.text } onChange={ this.inputChange } /></div>
          <Button type="primary" onClick={ this.sendMessage }>发送</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state
})
export default connect(mapStateToProps,null)(Chat)