import React from 'react'
import { Input, Button } from 'antd'
import io from 'socket.io-client'
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
    socket.emit('sendmsg',{text:this.state.text})
    this.setState({ text: '' })
  }
  componentDidMount(){
    socket.on('recvmsg',(data)=>{
      const { message } = this.state
      this.setState({
        message: [...message, data.text]
      })
    })
  }
  render(){
    const { userid } = this.props.match.params
    return (
      <div className="chatWrapper">
        chat页面{userid}
        {
          this.state.message.map(v=>{
            return <p key={v}>{v}</p>
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

export default Chat