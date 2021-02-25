import React from 'react';
import { BarsOutlined } from '@ant-design/icons'
import logo from '@/assets/images/logo.png'
import classnames from 'classnames'
import './index.less'
import { Transition } from 'react-transition-group'

const duration = 1000; // 动画持续的时间
const defaultStyle = { // 默认样式
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}
interface TransitionStyles {
  entering: React.CSSProperties, // css的行内属性
  entered: React.CSSProperties,
  exiting: React.CSSProperties,
  exited: React.CSSProperties,
}
const transitionStyles: TransitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

interface Props {
  currentCategory: string;
  setCurrentCategory: (currentCategory: string) => void
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function HomeHeader(props: Props) {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    const target: HTMLUListElement = event.target as HTMLUListElement; // 获取事件源对象
    const category = target.dataset.category; // 获取事件源对应的自定义属性
    props.setCurrentCategory(category);
    setIsMenuVisible(false);
  }
  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={logo} />
        <BarsOutlined onClick={() => setIsMenuVisible(true)} />
      </div>
      <Transition in={isMenuVisible} timeout={duration}>
        {
          (state: keyof TransitionStyles) => (
            <ul className="category" onClick={setCurrentCategory} style={{ ...defaultStyle, ...transitionStyles[state] }}>
              <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })}>全部</li>
              <li data-category="React" className={classnames({ active: props.currentCategory === 'React' })}>React</li>
              <li data-category="Vue" className={classnames({ active: props.currentCategory === 'Vue' })}>Vue</li>
            </ul>
          )
        }
      </Transition>
    </header >
  )
}

export default HomeHeader