import { ProfileState, RootState } from '@/store/reducers';
import React, { PropsWithChildren } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import './index.less'

type StateProps = ReturnType<typeof mapStateToProps>
type Prop = PropsWithChildren<RouteComponentProps> & StateProps;
function Profile(props: Prop) {
  return (
    <div>{props.title}</div>
  )
}
function mapStateToProps(state: RootState): ProfileState {
  return state.profile
}

export default connect(mapStateToProps)(Profile)