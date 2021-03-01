import NavBar from '@/components/NavBar'
import { RootState } from '@/store/reducers'
import { ProfileState } from '@/store/reducers/profile'
import { RegisterPayload } from '@/typings/user'
import { LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd';
import React, { PropsWithChildren } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import './index.less'
import actions from '@/store/actions/profile'


type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;
type Prop = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps;
function Register(props: Prop) {
  const onFinish = (values: RegisterPayload) => {
    props.register(values)
  }
  const onFinishFailed = (errorInfo: any) => {
    message.error('表单验证失败' + errorInfo)
  }
  return (
    <div className="register">
      <NavBar>注册</NavBar>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} className="register-form">
        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入你的用户名' }]}>
          <Input prefix={<UserAddOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入你的密码' }]}>
          <Input prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item label="确认密码" name="confirmPassword" rules={[{ required: true, message: '请输入你的密码' }]}>
          <Input prefix={<LockOutlined />} placeholder="确认密码" />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入你的邮箱' }]}>
          <Input prefix={<MailOutlined />} placeholder="邮箱" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-from-button">注册</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
function mapStateToProps(state: RootState): ProfileState {
  return state.profile
}

export default connect(mapStateToProps, actions)(Register)