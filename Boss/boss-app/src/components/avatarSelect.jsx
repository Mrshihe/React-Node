import React from 'react'

class AvatarSelect extends React.Component {
  state = {
    current: ''
  }
  handleClick(name){
    this.setState({current:name})
    // 利用onchange将值传递给父组件Form.Item的name属性
    this.props.onChange(name)
  }
  render(){
    const { current } = this.state
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
												.split(',')
												.map(v=>({
													icon: `${process.env.PUBLIC_URL}/headerIcons/${v}.png`,
													text:v
												}))
    return (
      <div className="AvatarSelectContainer">
        {
          avatarList.map(v=>{
            return(
              <div className="avatar-grid-item" 
                style={{backgroundColor:current===v.text?'#ddd':''}} 
                key={v.text} 
                onClick={ this.handleClick.bind(this,v.text) }
              >
                <img src={v.icon} alt={v.text}  />
                <p>{v.text}</p>
              </div>
            ) 
          })
        }
      </div>
    )
  }
}
export default AvatarSelect