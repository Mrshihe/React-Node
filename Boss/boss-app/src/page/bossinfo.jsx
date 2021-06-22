import React from 'react'
import { Form, Input, Button, Upload, message} from 'antd'
import axios from 'axios';

function normFile(e){
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}

class Boss extends React.Component {
  onFinish = (values) =>{
    const data = {...values,avatar:values.avatar[0].response.data}
    axios.post('/user/update',data).then(res=>{
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
        <h2>完善BOSS信息</h2>
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
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: '请上传公司logo!' }]}
          >
            <Upload name="file" action="/tools/upload">
              <Button>点击上传</Button>
            </Upload>
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