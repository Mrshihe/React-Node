import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class AuthRoute extends React.Component {
  componentDidMount(){
    const { pathname } = this.props.location
    if(['/login','/register'].indexOf(pathname) === -1){
      axios.get('/user/info').then(res=>{
        console.log(res)
      })
    }
  }
  render(){
    return <p>AuthRoute</p>
  }
}
export default withRouter(AuthRoute)