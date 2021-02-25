/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as types from '@/store/action-types'
import { AnyAction } from 'redux'
import { validate, register, login } from '@/api/profile'
import { LoginPayload, LoginResult, RegisterPayload, RegisterResult } from '@/typings/user'
import { push } from 'connected-react-router'
import { message } from 'antd'
const actions = {
  validate(): AnyAction {
    // 如果action的payload属性是一个promise的话，那么redux-promise中间件可以拦截，等待promise完成，完成后会重新派发
    // dispatch({type:types.VALIDATE,payload:变成原来的payload那个promise resolve出来的值})
    const result = {
      type: types.VALIDATE,
      payload: validate()
    }
    return result
  },
  register(values: RegisterPayload) {
    return function (dispatch: Function, getState: Function) { // redux-thunk
      (
        async function () {
          const result: RegisterResult = await register<RegisterResult>(values);
          if (result.err) { // 如果注册成功了，调转登录
            dispatch(push('/login'))
          } else {
            message.error(result.massage);
          }
        }
      )()
    }
  },
  login(values: LoginPayload) {
    return function (dispatch: Function, getState: Function) {// redux-thunk
      (
        async function () {
          const result: LoginResult = await login<LoginResult>(values);
          if (result.err == 0) { // 如果登录成功了，调转个人中心
            sessionStorage.setItem('token', result.data.token);
            dispatch(push('/profile'))
          } else {
            message.error(result.massage);
          }
        }
      )()
    }
  },
  logout() {
    return function (dispatch: Function) {
      sessionStorage.removeItem('token');
      dispatch({ type: types.LOGOUT });
      dispatch(push('/login'))
    }
  }
}
export default actions