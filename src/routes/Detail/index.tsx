import NavBar from '@/components/NavBar';
import { Lesson, LessonResult } from '@/typings/lesson';
import { Card } from 'antd';
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import './index.less'
import { StaticContext } from 'react-router'
import { getLesson } from '@/api/home';

interface Params { // 路径 /detail/:id = params{}
  id: string
}
type RouteProps = RouteComponentProps<Params, StaticContext, Lesson>;
type Prop = PropsWithChildren<RouteProps>;
function LessonDetail(props: Prop) {
  const [lesson, setLesson] = useState({} as Lesson);
  useEffect(() => {
    (async function () {
      let lesson: Lesson = props.location.state;
      if (!lesson) {
        const id = props.match.params.id;
        let result: LessonResult = await getLesson<LessonResult>(id);
        if(result.success) {
          lesson = result.data;
        }
      }
      setLesson(lesson)
    })()
  }, [])
  return (
    <>
      <NavBar>{lesson.title}</NavBar>
      <Card
        hoverable
        style={{ width: '100%' }}
        cover={<video src={lesson.video} controls autoPlay={false}></video>}
      >
        <Card.Meta title={lesson.title} description={<p>价格：{lesson.price}</p>} />
      </Card>
    </>
  )
}
export default connect()(LessonDetail)