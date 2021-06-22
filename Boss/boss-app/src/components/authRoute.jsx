import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class AuthRoute extends React.Component {
  componentDidMount(){
    const { pathname } = this.props.location
    if(['/login','/register'].indexOf(pathname) === -1){
      axios.get('/user/info').then(res=>{
        if(res.data.code === 0){
          const { type, title } = res.data.data
          type==='staff' ? 
            title ? this.props.history.push('/staffinfo') : this.props.history.push('/staffinfo') 
          : 
            title ? this.props.history.push('/boss') : this.props.history.push('/bossinfo')
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
export default withRouter(AuthRoute)