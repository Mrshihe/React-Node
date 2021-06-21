import React from 'react'
import { Form, Input, Button, Upload} from 'antd'

class Boss extends React.Component {
  onFinish = (values) =>{
    console.log( values )
  }
  render(){
    return (
      <div style={{padding:'30px'}}>
        <h2>完善BOSS信息</h2>
        <Upload name="file" action="/user/upload">
          <Button>点击上传</Button>
        </Upload>
        <Form
          name="basic"
          onFinish={ this.onFinish }
        >
          <Form.Item
            name="company"
            label="公司名称"
            rules={[{ required: true, message: '请输入公司名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="公司LOGO"
            rules={[{ required: true, message: '请上传公司logo!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="desc"
            label="公司简介"
            rules={[{ required: true, message: '请输入公司简介!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="title"
            label="招聘职位"
            rules={[{ required: true, message: '请输入招聘职位!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="money"
            label="职位薪资"
            rules={[{ required: true, message: '请输入职位薪资!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="jobrequirements"
            label="职位要求"
            rules={[{ required: true, message: '请输入职位要求!' }]}
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
export default Boss