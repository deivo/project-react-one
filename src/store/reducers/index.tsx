import { combineReducers, ReducersMapObject, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '@/store/history'
import home from '@/store/reducers/home'
import mine from '@/store/reducers/mine'
import profile from '@/store/reducers/profile'


// 定义一个映射对象 key是字符串，值是一个reducer
const reducers: ReducersMapObject = {
  router: connectRouter(history),
  home,
  mine,
  profile
}
// 根状态等于
type RootState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}
const rootReducer: Reducer<RootState> = combineReducers<RootState>(reducers)
export { RootState }
export default rootReducer
