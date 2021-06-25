import React from 'react'
import { connect } from 'react-redux'
import { userLogoutAction } from '../redux/actions'
import { Card, Avatar, Button, Modal } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

function Person(props){
  const { name, type } = props
  function logout(){
    Modal.confirm({
      content: '您确认要退出登录？',
      onOk(){
        axios.post('/user/logout').then(res=>{
          if(res.data.code===0){
            props.userLogoutAction()
            props.history.push('/login')
          }
        })
      }
    })
  }
  return(
    <div className="personWrapper">
      <Card>
        <Card.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={ '您好 '+ name }
          description={ type }
        />
      </Card>
      <Button className="quitButton" type="primary" onClick={ logout }>退出登录</Button>
    </div>
  )
}

const mapStateToProps = state => state
const mapDispatchToProps = { userLogoutAction }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Person))