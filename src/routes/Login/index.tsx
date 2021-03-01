import NavBar from '@/components/NavBar'
import { RootState } from '@/store/reducers'
import { ProfileState } from '@/store/reducers/profile'
import { LoginPayload } from '@/typings/user'
import { LockOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import React, { PropsWithChildren } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import './index.less'
import actions from '@/store/actions/profile'

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;
type Prop = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps;
function Login(props: Prop) {
  const onFinish = (values: LoginPayload) => {
    props.login(values)
  }
  const onFinishFailed = (errorInfo: any) => {
    message.error('表单验证失败' + errorInfo)
  }
  return (
    <div className="login">
      <NavBar>登录</NavBar>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} className="login-form">
        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入你的用户名' }]}>
          <Input prefix={<UserAddOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入你的密码' }]}>
          <Input prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-from-button">登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
function mapStateToProps(state: RootState): ProfileState {
  return state.profile
}

export default connect(mapStateToProps, actions)(Login)