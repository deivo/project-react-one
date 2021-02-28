/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import './index.less'
import { Carousel } from 'antd'
import Slider from '@/typings/slider'

interface Props {
  sliders: Slider[],
  // eslint-disable-next-line @typescript-eslint/ban-types
  getSliders: Function
}
function HomeSliders(props: Props) {
  React.useEffect(() => {
    if (props.sliders.length === 0) {
      props.getSliders(); // 请求加载一次
    }
  }, []);
  console.log(props.sliders, 'home-sliders');
  return (
    <Carousel effect={'scrollx'} autoplay>
      {
        props.sliders.map((slider: Slider, index: number) => (
          <div key={index} id={slider.url}>
            <img src={slider.url} width="100%" />
          </div>
        ))
      }
    </Carousel>
  )
}

export default HomeSliders