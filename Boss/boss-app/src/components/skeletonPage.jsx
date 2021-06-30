import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { getMessageList, receiveMsg } from '../redux/actions'

import Boss from '../page/boss'
import Staff from '../page/staff'
import User from '../page/person'

function Msg(){
  return <h2>消息列表</h2>
}

class SkeletonPage extends React.Component{
  componentDidMount(){
    this.props.getMessageList()
    this.props.receiveMsg()
  }
  render(){
    const { type } = this.props.user
    const { unread } = this.props.chat
    const { pathname } = this.props.location
    const navList = [
      {
				path:'/boss',
				text:'牛人',
				icon:'staff',
				title:'牛人列表',
				component: Boss,
        hide: type === 'staff'
			},
			{
				path:'/staff',
				text:'boss',
				icon:'boss',
				title:'BOSS列表',
				component: Staff,
        hide: type === 'boss'
			},
			{
				path:'/message',
				text:'消息',
				icon:'message',
				title:'消息列表',
				component: Msg
			},
			{
				path:'/person',
				text:'我',
				icon:'person',
				title:'个人中心',
				component: User
			}
    ]
    return (
      <div className="skeletonWrapper">
        <div className="headerNav">{ navList.find(v=>v.path===pathname)?.title }</div>
        <Switch>
        {
          navList.map(v => 
            <Route key={v.path} path={v.path} component={ v.component }></Route>
          )
        }
        </Switch>
        <div className="tabsBarWrap">
          <div className="tabsBar">
            {
              navList.filter(v=>!v.hide).map(v=>{
                return(
                  <div className="tabBar" key={v.path} onClick={ ()=> this.props.history.push(v.path) }>
                    <div className="icon">
                      <span className="badge">
                        <div 
                          className="icon-img"
                          style={{backgroundImage: `url(${pathname===v.path ? process.env.PUBLIC_URL+'/footerIcons/'+v.icon+'-active.png' : process.env.PUBLIC_URL+'/footerIcons/'+v.icon+'.png'})`}}
                        ></div>
                        { v.path === '/message' ? <sup className="badge-text">{ unread }</sup> : null}
                      </span>
                    </div>
                    <p className="title">{v.text}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user, chat }) => ({
  user, chat
})
const mapDispathToProps = {
  receiveMsg,
  getMessageList
}

export default connect(mapStateToProps,mapDispathToProps)(SkeletonPage)