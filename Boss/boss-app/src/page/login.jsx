import React, { useEffect } from 'react'
import { Card, Form, Input, Button } from 'antd';
import axios from 'axios';

function Login(props){
	function onFinish(values){
		console.log('Finish:', values);
	}
	function onRegister(){
		props.history.push('/register')
	}
	useEffect(()=>{
		axios.get('/user/info').then(res=>{
			console.log(res)
		})
	},[])
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