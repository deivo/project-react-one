/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as types from '@/store/action-types'
import { AnyAction } from 'redux'
import { getSliders, getLessons } from '@/api/home'
const actions = {
  setCurrentCategory(currentCategory: string): AnyAction {
    return { type: types.SET_CURRENT_CATEGORY, payload: currentCategory }
  },
  getSliders() {
    return {
      type: types.GET_SLIDERS,
      payload: getSliders()
    }
  },
  getLessons() { // 获取课程
    return function (dispatch: Function, getState: Function) {
      (async function () {
        const { currentCategory, lessons: { hasMore, offset, limit, loading } } = getState().home;
        if (hasMore && !loading) {
          dispatch({ type: types.SET_LESSONS_LOADING, payload: true }); // 加载状态改为 true
          const result = await getLessons(currentCategory, offset, limit);
          dispatch({ type: types.SET_LESSONS, payload: result.data }); // 设置新的课程数据
        }
      })()
    }
  },
  refreshLessons() { // 重新获取第一页的数据，读取最新的分类
    return function (dispatch: Function, getState: Function) {
      (async function () {
        const { currentCategory, lessons: { limit, loading } } = getState().home;
        if (!loading) {
          dispatch({ type: types.SET_LESSONS_LOADING, payload: true }); // 加载状态改为 true
          const result = await getLessons(currentCategory, 0, limit);
          dispatch({ type: types.REFRESH_LESSONS, payload: result.data }); // 设置新的课程数据
        }
      })()
    }
  }
}
export default actions