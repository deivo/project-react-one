/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useReducer } from 'react'
import './index.less'
import Lesson from '@/typings/lesson'
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Lessons } from '@/store/reducers/home';
import { Alert, Button, Card, Skeleton } from 'antd'
import { loadMore } from '@/utils'

interface Props {
  lessons: Lessons,
  getLessons: any,
  homeContainerRef: any
}
interface VisibleLesson extends Lesson {
  index: number,
}
function LessonList(props: Props, forwardRef: any) {
  // 强制更新的方法，类组件里forceUpdate，函数组件里只能模拟一个，+1的目的是为了让值改变
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  forwardRef.current = forceUpdate;
  useEffect(() => {
    if (props.lessons.list.length === 0) {
      props.getLessons(); // 请求加载一次
    }
  }, []);
  let start = 0, end = 0; // 主要是要计算起始索引和结束的索引
  const homeContainerRef = props.homeContainerRef.current;
  const remUnit: number = parseFloat(document.documentElement.style.fontSize); // 真实的rem值
  const itemSize = (650 / 75) * remUnit; // 每个条目的高度
  const screenHight = window.innerHeight - (220 / 75) * remUnit; // 屏幕的高度 200=header+footer高度
  if (homeContainerRef) {
    const scrollTop = homeContainerRef.scrollTop; // 获取容器向上卷去的高度
    start = Math.floor(scrollTop / itemSize); // 要显示的条目的起始索引
    end = start + Math.floor(screenHight / itemSize);
    start -= 2;
    end += 2;
    start = start < 0 ? 0 : start;
    end = end > props.lessons.list.length ? props.lessons.list.length : end; // 已经大于最后一条
  }
  const visibleList = props.lessons.list.map((item: Lesson, index: number) => ({ ...item, index })).slice(start, end);
  const cardStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: itemSize
  }
  const bottomTop = props.lessons.list.length * itemSize;
  return (
    <section className="lesson-list">
      <h2><MenuOutlined />全部课程</h2>
      <Skeleton
        loading={props.lessons.list.length === 0 && props.lessons.loading}
        active
        paragraph={{ rows: 8 }}
      >
        <div style={{ position: 'relative', width: '100%', height: `${props.lessons.list.length * itemSize}px` }}>
          {
            visibleList.map((lesson: VisibleLesson) => (
              <Link
                to={{ pathname: `/detail/${lesson.id}`, state: lesson }}
                key={lesson.id}
                style={{ ...cardStyle, top: `${itemSize * lesson.index}px` }}
              >
                <Card
                  hoverable={true}
                  style={{ width: `100%` }}
                  cover={<img src={lesson.poster} />}
                >
                  <Card.Meta title={lesson.title} description={`价格：¥${lesson.price}元`} />
                </Card>
              </Link>
            ))
          }
          {
            props.lessons.hasMore ?
              (<Button
                onClick={props.getLessons}
                loading={props.lessons.loading}
                type="primary"
                block
                style={{ textAlign: 'center', top: `${bottomTop}px` }}
              >
                {props.lessons.loading ? '' : '加载更多...'}
              </Button>)
              : (<Alert
                style={{ textAlign: 'center', top: `${bottomTop}px` }}
                message="已经到底了"
                type="warning"
              />)
          }
        </div>
      </Skeleton>
    </section>
  )
}

export default React.forwardRef(LessonList)