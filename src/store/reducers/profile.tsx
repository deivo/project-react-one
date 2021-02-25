import { AnyAction } from "redux"
import LOGIN_TYPES from '@/typings/login-types'
import * as types from '@/store/action-types'
import { User } from "@/typings/user";

export interface ProfileState {
  title: string;
  loginState: LOGIN_TYPES; // 用户登录状态：未验证/未登录/登录
  user: User; // 用户信息
  error: string | null; // 失败原因
}
const initialState: ProfileState = { 
  title: '个人中心', 
  loginState: LOGIN_TYPES.UN_VALIDATE, // 默认状态是未验证
  user: null,
  error: null
}
function reducer(state: ProfileState = initialState, action: AnyAction): ProfileState {
  switch (action.type) {
  case types.VALIDATE:
    if(action.payload.err == 0){
      return {...state, loginState:LOGIN_TYPES.LOGIN, user: action.payload.data, error: null};
    } else {
      return {...state, loginState:LOGIN_TYPES.UN_LOGIN, user: null, error: action.payload};
    }
  case types.LOGOUT:
    return {...state, loginState:LOGIN_TYPES.UN_LOGIN, user: null, error: null};
  default:
    return state;
  }
}

export default reducer