import React from 'react'
import { Card, Avatar } from 'antd'
import axios from 'axios'


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
  render(){
    return(
      <div>
        {
          this.state.list.map(v => {
            return (
              <Card key={v._id}>
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
export default Boss