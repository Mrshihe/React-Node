import React from 'react'
import { Card } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Staff extends React.Component{
  state = {
    list: []
  }
  componentDidMount(){
    axios.get(`/user/list?type=boss`).then(res => {
      if(res.data.code===0){
        this.setState({
          list: res.data.data
        })
      }
    })
  }
  handClick = (v)=>{
    this.props.history.push(`/chat/${v.name}`)
  }
  render(){
    return(
      <div className="staffWrapper">
        {
          this.state.list.map( v => {
            return (
              <Card key={v._id} title={v.company} extra={v.title} style={{marginBottom:'10px'}} 
                onClick={()=>this.handClick(v)} 
              >
                <p className="label"><span>公司简介:</span></p>
                <p>{v.desc}</p>
                <p className="label"><span>薪资范围:</span></p>
                <p>{v.money}</p>
                <p className="label"><span>职位要求:</span></p>
                <p>{v.jobrequirements}</p>
              </Card>
            )
          })
        }
      </div>
    )
  }
}
export default withRouter(Staff)