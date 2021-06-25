import React from 'react'
import { Card, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux'
import { userLoginAction  } from '../redux/actions'

function Login(props){
	function onFinish(values){
		const {username, password, } = values
		axios.post('/user/login',{username,password}).then(res=>{
			if(res.data.code === 0){
				const { type, title, _id } = res.data.data
				props.userLoginAction({name:username,type,_id})
				message.success({
					content:'登录成功',
					duration: 1.5,
					onClose: ()=>{
						type === 'staff' ? 
							title ? props.history.push('/staff') : props.history.push('/staffinfo') 
						: 
						  title ? props.history.push('/boss') : props.history.push('/bossinfo')
					}
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
const mapDispatchToProps = {
  userLoginAction
}
export default connect(null,mapDispatchToProps)(Login)