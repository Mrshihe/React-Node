import React from 'react'
import { Form, Input, Button, message} from 'antd'
import axios from 'axios';

import AvatarSelect from '../components/avatarSelect';

class Staff extends React.Component {
  onFinish = (values)=>{
    axios.post('/user/update',values).then(res=>{
      if(res.data.code===0){
        message.success('更新成功', 1.5)
      }else{
        message.error(res.msg || '稍后重试', 1.5)
      }
    })
  }
  render(){
    return (
      <div style={{padding:'30px'}}>
        <h2>完善Staff信息</h2>
        <Form
          name="basic"
          onFinish={ this.onFinish }
        >
          <Form.Item 
            label="选择头像" 
            name="avatar"
          >
            <AvatarSelect />
          </Form.Item>
          <Form.Item
            name="title"
            label="求职职位"
            rules={[{ required: true, message: '请输入求职职位!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            label="个人简介"
            rules={[{ required: true, message: '请输入个人简介!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default Staff