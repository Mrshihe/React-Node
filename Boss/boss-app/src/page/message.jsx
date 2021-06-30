import React from 'react'
import { List, Avatar } from 'antd'
import { connect } from 'react-redux'

class Message extends React.Component {
  render(){
    const { user, chat } = this.props 
    const chatMsgGroup = {} 
    chat.messageList.forEach(v => {
      chatMsgGroup[v.chatid] = chatMsgGroup[v.chatid] || []
      chatMsgGroup[v.chatid].push(v)
    })
    const getLast = arr => arr[arr.length-1]
    const chatList = Object.values(chatMsgGroup) || []
    return (
      <div className="messageWrapper">
        <List>
          {
            chatList.map(v => {
              const last = getLast(v)
              console.log(last)
              return (
                <List.Item key={ last._id }>
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

const mapDispathToProps = {}

export default connect(mapStateToProps,null)(Message) 