import { ProfileState, RootState } from '@/store/reducers'
import React, { PropsWithChildren, useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import './index.less'
import actions from '@/store/actions/profile'
import { AxiosError } from 'axios'
import { message, Descriptions, Button, Alert } from 'antd'
import LOGIN_TYPES from '@/typings/login-types'

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions
type Prop = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps;
function Profile(props: Prop) {
  useEffect(() => {
    props.validate().catch((error: AxiosError) => message.error(error.message))
  }, [])
  let content = null;
  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    // 什么都不做，还是null
  } else if (props.loginState === LOGIN_TYPES.LOGIN) {
    content = (
      <div className="user-info">
        <Descriptions>
          <Descriptions.Item label="用户名">Deivo</Descriptions.Item>
          <Descriptions.Item label="手机号">13800001111</Descriptions.Item>
          <Descriptions.Item label="邮箱">15723424@qq.com</Descriptions.Item>
        </Descriptions>
        <Button type="primary" onClick={() => props.logout()}>退出登录</Button>
      </div>
    )
  } else if (props.loginState === LOGIN_TYPES.UN_LOGIN) {
    content = (
      <>
        <Alert type="warning" message="当前用户尚未登录" description="亲爱的用户你好，请选择注册或者登录" />
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Button type="dashed" onClick={() => props.history.push('/login')}>登录</Button>
          <Button type="dashed" onClick={() => props.history.push('/register')}>注册</Button>
        </div>
      </>
    )
  }
  return (
    <section>
      <NavBar>个人中心</NavBar>
      {content}
    </section>
  )
}
function mapStateToProps(state: RootState): ProfileState {
  return state.profile
}

export default connect(mapStateToProps, actions)(Profile)