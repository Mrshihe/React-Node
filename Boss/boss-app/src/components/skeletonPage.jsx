import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Boss from '../page/boss'
import Staff from '../page/staff'

function Msg(){
  return <h2>消息列表</h2>
}
function User(){
  return <h2>个人中心</h2>
}
class SkeletonPage extends React.Component{
  render(){
    const { UserType } = this.props
    const { pathname } = this.props.location
    const navList = [
      {
				path:'/boss',
				text:'牛人',
				icon:'staff',
				title:'牛人列表',
				component: Boss,
        hide: UserType === 'staff'
			},
			{
				path:'/staff',
				text:'boss',
				icon:'boss',
				title:'BOSS列表',
				component: Staff,
        hide: UserType === 'boss'
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
        <div className="headerNav">{navList.find(v=>v.path===pathname).title}</div>
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
                        { v.path === '/message' ? <sup className="badge-text">99</sup> : null}
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

const mapStateToProps = state => ({
  UserName: state.name,
  UserType: state.type
})

export default connect(mapStateToProps,null)(SkeletonPage)