import * as types from '@/store/action-types'
import { AnyAction } from 'redux'
import { validate } from '@/api/profile'
const actions = {
  validate(): AnyAction {
    // 如果action的payload属性是一个promise的话，那么redux-promise中间件可以拦截，等待promise完成，完成后会重新派发
    // dispatch({type:types.VALIDATE,payload:变成原来的payload那个promise resolve出来的值})
    return {
      type: types.VALIDATE,
      payload: validate()
    }
  }
}
export default actions