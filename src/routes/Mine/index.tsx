import { RootState } from '@/store/reducers'
import { MineState } from '@/store/reducers/mine'
import React, { PropsWithChildren } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import './index.less'

type StateProps = ReturnType<typeof mapStateToProps>
type Prop = PropsWithChildren<RouteComponentProps> & StateProps;
function Mine(props: Prop) {
  return (
    <div>{props.title}</div>
  )
}
function mapStateToProps(state: RootState): MineState {
  return state.mine
}

export default connect(mapStateToProps)(Mine)