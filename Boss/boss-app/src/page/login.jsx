import React from 'react'
import { Card, Form, Input, Button, message } from 'antd';
import axios from 'axios';

function Login(props){
	function onFinish(values){
		const {username, password} = values
		axios.post('/user/login',{username,password}).then(res=>{
			if(res.data.code === 0){
				message.success({
					content:'登录成功',
					duration: 1.5
				})
			}else{
				message.error({
					content: res.data.msg,
					duration: 1.5
				})
			}
		})
	}
	function onRegister(){
		props.history.push('/register')
	}
	return (
		<Card title="登录页面" style={{padding:'50px 20px'}}>
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

				<Form.Item>
					<Button type="primary" htmlType="submit">登录</Button>
					<Button type="link" htmlType="button" onClick={ onRegister }>注册账号</Button>
				</Form.Item>
			</Form>
		</Card>	
	)
}
export default Login