import { AnyAction } from "redux"
import * as types from '@/store/action-types'
import Slider from '@/typings/slider'
import Lesson from "@/typings/lesson";

export interface Lessons {
  loading: boolean,
  list: Lesson[],
  hasMore: boolean, // 是否有更多数据，是不是最后一页
  offset: number,
  limit: number
}
export interface HomeState {
  title: string;
  currentCategory: string;
  sliders: Slider[],
  lessons: Lessons,
}
const initialState: HomeState = {
  title: '首页',
  currentCategory: 'all',
  sliders: [],
  lessons: {
    loading: false,
    list: [],
    hasMore: true, // 是否有更多数据，是不是最后一页
    offset: 0,
    limit: 5
  },
}
function reducer(state: HomeState = initialState, action: AnyAction): HomeState {
  switch (action.type) {
  case types.SET_CURRENT_CATEGORY:
    return { ...state, currentCategory: action.payload };
  case types.GET_SLIDERS:
    return { ...state, sliders: action.payload.data };
  case types.SET_LESSONS_LOADING:
    return { ...state, lessons: { ...state.lessons, loading: action.payload } }
  case types.SET_LESSONS:
    return {
      ...state, 
      lessons: {
        ...state.lessons,
        loading: false,
        hasMore: action.payload.hasMore,
        list: [...state.lessons.list, ...action.payload.list],
        offset: state.lessons.offset + action.payload.list.length
      }
    }
  default:
    return state;
  }
}

export default reducer