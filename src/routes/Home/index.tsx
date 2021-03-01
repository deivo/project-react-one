import React, { PropsWithChildren, useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { HomeState, RootState } from '@/store/reducers'
import HomeHeader from './components/HomeHeader'
import HomeSliders from './components/HomeSliders'
import LessonList from './components/LessonList'
import actions from '@/store/actions/home'
import './index.less'
import { downRefresh, loadMore } from '@/utils'
import { Spin } from 'antd'
import { throttle } from '@/utils'

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Prop = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps;
function Home(props: Prop) {
  const homeContainerRef = React.useRef(null); // 后面用来实现上拉加载，下拉刷新
  const lessonListRef = React.useRef(null); // 用来实现虚拟列表 
  useEffect(() => {
    // homeContainerRef.current 指向 div
    loadMore(homeContainerRef.current, props.getLessons);
    downRefresh(homeContainerRef.current, props.refreshLessons)
    lessonListRef.current();
    homeContainerRef.current.addEventListener('scroll', throttle(lessonListRef.current, 30));
  }, [])
  return (
    <>
      <Spin size="large" />
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
        refreshLessons={props.refreshLessons}
      />
      <div className="home-container" ref={homeContainerRef}>
        <HomeSliders sliders={props.sliders} getSliders={props.getSliders} />
        <LessonList
          lessons={props.lessons}
          getLessons={props.getLessons}
          ref={lessonListRef}
          homeContainerRef={homeContainerRef}
        />
      </div>
    </>
  )
}
function mapStateToProps(state: RootState): HomeState {
  return state.home
}
export default connect(mapStateToProps, actions)(Home)