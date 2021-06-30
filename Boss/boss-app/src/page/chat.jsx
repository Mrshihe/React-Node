import React from 'react'
import { Input, Button, List, Avatar, message } from 'antd'
import io from 'socket.io-client'
import axios from 'axios'
import { connect } from 'react-redux'
import { emojiArray } from '../emoji'
const socket = io('ws://localhost:9000')
class Chat extends React.Component{
  state = {
    text: '',
    message: [],
    emojiShow: false,
    users: []
  }
  inputChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  sendMessage = () =>{
    if(!this.state.text){
      message.error('请输入消息',1.2)
      return false
    }
    const content = this.state.text
    const from = this.props.user['_id']
    const to = this.props.match.params.userid
    socket.emit('sendmsg',{from,content,to})
    this.setState({ text: '' , emojiShow: false})
  }
  getMessageList = () => {
    const { userid } = this.props.match.params
    axios.get(`/user/msglist?talkid=${userid}`).then(res =>{
      if(res.data.code===0){
        const { data, users } = res.data
        if(this._isMounted){
          this.setState({
            message:[...this.state.message, ...data],
            users
          })
        }
      }
    })
  }
  showEmoji = ()=>{
    this.setState({
      emojiShow: !this.state.emojiShow
    })
  }
  selectEmoji = (v)=>{
    this.setState({
      text: this.state.text + v
    })
  }
  componentDidMount(){
    this._isMounted = true
    this.getMessageList()
    socket.on('recvmsg', data => {
      const { message } = this.state
      if(this._isMounted){
        this.setState({
          message: [...message, data]
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
        <List>
          {
            this.state.message.map((v,i)=>{
              return (
                <List.Item key={v._id} className={v.from===userid?'':'rightShow'}>
                  <List.Item.Meta
                    avatar={
                      this.state.users[v.from].avatar.indexOf('http')>-1 
                      ? <Avatar src={this.state.users[v.from].avatar} />
                      : <Avatar src={`${process.env.PUBLIC_URL}/headerIcons/${this.state.users[v.from].avatar}.png`} />
                    }
                    description={v.content}
                  />
                </List.Item>
              )
            })
          }
        </List>
        <div className="chatSendWrapper">
          <div className="chatSend">
            <div className="chatInput"><Input value={ this.state.text } onChange={ this.inputChange } /></div>
            <Button onClick={ this.showEmoji }>😀</Button>
            <Button type="primary" onClick={ this.sendMessage }>发送</Button>
          </div>
          {this.state.emojiShow ? <div className="emojiBox">
            {
              emojiArray.map((v,i)=>{
                return <div className="emojiItem" key={i} onClick={()=> this.selectEmoji(v) }><span>{v}</span></div>
              })
            }
          </div> : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state
})
export default connect(mapStateToProps,null)(Chat)