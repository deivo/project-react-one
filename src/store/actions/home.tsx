import * as types from '@/store/action-types'
import { AnyAction } from 'redux'
const actions = {
  setCurrentCategory(currentCategory: string): AnyAction {
    return { type: types.SET_CURRENT_CATEGORY, payload: currentCategory }
  }
}
export default actions