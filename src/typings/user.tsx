// 注册
export interface RegisterPayload {
  username: string,
  password: string,
  email: string,
  confirmPassword: string
}

// 登录
export interface LoginPayload {
  username: string,
  password: string
}

export interface BaseResult {
  success: boolean,
  massage?: string
}

// 注册结果
export type RegisterResult = BaseResult & {
  data?: { token: string }
}

// 登录结果
export type LoginResult = BaseResult & {
  data?: { token: string },
}

export interface User {
  id: string,
  username: string,
  password: string,
  email: string,
  avatar: string,
}