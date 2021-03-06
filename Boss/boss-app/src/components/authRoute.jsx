import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLoginAction } from '../redux/actions'

class AuthRoute extends React.Component {
  componentDidMount(){
    const { pathname } = this.props.location
    if(['/login','/register'].indexOf(pathname) === -1){
      axios.get('/user/info').then(res=>{
        if(res.data.code === 0){
          const { name, type, title, _id } = res.data.data
          this.props.userLoginAction({name,type,_id})
          if(type==='staff' && !title) { this.props.history.push('/staffinfo') }
          if(type==='boss' && !title) { this.props.history.push('/bossinfo') }
        }else{
          this.props.history.push('/login')
        }
      })
    }else{
      return null
    }
  }
  render(){
    return null
  }
}
const mapDispatchToProps = {
  userLoginAction
}
export default withRouter(connect(null,mapDispatchToProps)(AuthRoute))