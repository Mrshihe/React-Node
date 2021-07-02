import React from 'react'
import { List, Avatar, Badge } from 'antd'
import { connect } from 'react-redux'
import {} from 'react-router-dom'

class Message extends React.Component {
  toChat = (id) => {
    this.props.history.push(`/chat/${id}`)
  }
  render(){
    const { chat } = this.props 
    const chatMsgGroup = {} 
    chat.messageList.forEach(v => {
      chatMsgGroup[v.chatid] = chatMsgGroup[v.chatid] || []
      chatMsgGroup[v.chatid].push(v)
    })
    const getLast = arr => arr[arr.length-1]
    // 将聊天信息分组展示，并且最新的消息在前边
    const chatList = Object.values(chatMsgGroup).sort((a,b)=>{
      const a_last = getLast(a).createTime
      const b_last = getLast(b).createTime
      return b_last - a_last
    }) || []
    return (
      <div className="messageWrapper">
        <List>
          {
            chatList.map(v => {
              const last = getLast(v)
              const unread = v.filter(v=>!v.isRead).length
              return (
                <List.Item 
                  key={ last._id } 
                  extra={ <Badge count={ unread } /> }
                  onClick={ () => this.toChat(last.from) }
                >
                  <List.Item.Meta
                    avatar={
                      chat.messageUsers[last.from].avatar.indexOf('http') > -1
                      ?<Avatar src={ chat.messageUsers[last.from].avatar } />
                      :<Avatar src={`${process.env.PUBLIC_URL}/headerIcons/${chat.messageUsers[last.from].avatar}.png`} />
                    }
                    title={ chat.messageUsers[last.from].name }
                    description={ last.content }
                  />
                </List.Item>
              )
            })
          }
        </List>
      </div>
    )
  }
}

const mapStateToProps = ({ user, chat }) => ({
  user, chat
})

export default connect(mapStateToProps,null)(Message) 