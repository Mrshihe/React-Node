import React from 'react'
import { Input, Button, List, Avatar, PageHeader, message } from 'antd'
import { connect } from 'react-redux'
import { getMessageList, sendMsg, receiveMsg } from '../redux/actions'
import { emojiArray } from '../emoji'

class Chat extends React.Component{
  state = {
    text: '',
    emojiShow: false
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
    this.props.sendMsg({from,content,to})
    this.setState({ text: '' , emojiShow: false})
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
    if(!this.props.chat.messageList.lenght){
      this.props.getMessageList(this.props.match.params.userid)
      this.props.receiveMsg()
    }
  }
  render(){
    const { userid } = this.props.match.params
    const { chat } = this.props
    const { emojiShow } = this.state
    const padbottom = emojiShow ? { paddingBottom: '72px' } : { paddingBottom: '32px' }
    return (
      <div className="chatWrapper" style={ padbottom } >
        <PageHeader
          className="chatWrapperHeader"
          title={ chat?.messageUsers[userid]?.name }
          onBack={() => this.props.history.goBack() }
        />
        <List>
          {
            chat.messageList.map((v,i)=>{
              return (
                <List.Item key={v._id} className={v.from===userid?'':'rightShow'}>
                  <List.Item.Meta
                    avatar={
                      chat.messageUsers[v.from].avatar.indexOf('http')>-1 
                      ? <Avatar src={chat.messageUsers[v.from].avatar} />
                      : <Avatar src={`${process.env.PUBLIC_URL}/headerIcons/${chat.messageUsers[v.from].avatar}.png`} />
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
            <div className="chatInput">
              <Input value={ this.state.text } onChange={ this.inputChange } placeholder="请输入" />
            </div>
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

const mapStateToProps = ({ user, chat }) => ({
  user,
  chat
})
const mapDispatchToProps = {
  getMessageList,
  sendMsg,
  receiveMsg
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat)