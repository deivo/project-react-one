/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { PropsWithChildren } from 'react'
import './index.less'
import { LeftOutlined } from '@ant-design/icons'
import { RouteComponentProps, withRouter } from 'react-router';

type Props = PropsWithChildren<RouteComponentProps>;
function NavBar(Props: Props) {
  return (
    <div className="nav-header">
      <LeftOutlined onClick={() => Props.history.goBack()} />
      {Props.children}
      <span>&nbsp;</span>
    </div>
  )
}

export default withRouter(NavBar)