import React from 'react'
import { Card, Form, Input, Button, Radio } from 'antd';
import axios from 'axios';

function Register(){
  function onFinish(values){
		axios.post('/user/register',values).then(res=>{
			console.log(res)
		})
	}
  return (
		<Card title="注册页面" style={{padding:'50px 20px'}}>
			<Form
				name="basic"
				onFinish={onFinish}
			>
				<Form.Item
					label="用户名"
					name="username"
					rules={[{ required: true, message: '请输入用户名!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="密码"
					name="password"
					rules={[{ required: true, message: '请输入密码!' }]}
				>
					<Input.Password />
				</Form.Item>
        <Form.Item
					label="确认密码"
					name="passwordAgain"
					rules={[{ required: true, message: '请确认密码!' }]}
				>
					<Input.Password />
				</Form.Item>
        <Form.Item 
          name="radioGroup" 
          label="选择身份"
          rules={[{ required: true, message: '请选择您的身份!' }]}
        >
          <Radio.Group>
            <Radio value="staff">应聘者</Radio>
            <Radio value="boss">招聘者</Radio>
          </Radio.Group>
        </Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">注册</Button>
				</Form.Item>
			</Form>
		</Card>	
	)
}
export default Register