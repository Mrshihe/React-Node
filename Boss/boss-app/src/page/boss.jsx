import React from 'react'
import { Card, Avatar } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


class Boss extends React.Component{
  state = {
    list: []
  }
  componentDidMount(){
    axios.get('/user/list?type=staff').then(res => {
      if(res.data.code === 0){
        this.setState({
          list: res.data.data
        })
      }
    })
  }
  handleClick = (v)=>{
    this.props.history.push(`/chat/${v.name}`)
  }
  render(){
    return(
      <div>
        {
          this.state.list.map(v => {
            return (
              <Card key={v._id} onClick={()=>this.handleClick(v)}>
                <Card.Meta
                  avatar={
                    <Avatar src={ `${process.env.PUBLIC_URL}/headerIcons/${v.avatar}.png` } />
                  }
                  title={
                    <p 
                      style={{display:'flex',justifyContent:'space-between'}}
                    >
                      <span>{v.name}</span><span>{v.title}</span>
                    </p>
                  }
                  description={v.desc}
                />
              </Card>
            )
          })
        }
      </div>
    )
  }
}
export default withRouter(Boss)