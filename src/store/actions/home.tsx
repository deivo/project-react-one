/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as types from '@/store/action-types'
import { AnyAction } from 'redux'
import { getSliders } from '@/api/home'
const actions = {
  setCurrentCategory(currentCategory: string): AnyAction {
    return { type: types.SET_CURRENT_CATEGORY, payload: currentCategory }
  },
  getSliders() {
    return {
      type: types.GET_SLIDERS,
      payload: getSliders()
    }
  }
}
export default actions