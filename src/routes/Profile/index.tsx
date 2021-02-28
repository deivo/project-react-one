import React, { PropsWithChildren, useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import './index.less'
import { ProfileState, RootState } from '@/store/reducers'
import NavBar from '@/components/NavBar'
import actions from '@/store/actions/profile'
import { AxiosError } from 'axios'
import { Descriptions, Button, Alert, Upload, message } from 'antd'
import LOGIN_TYPES from '@/typings/login-types'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface'

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions
type Prop = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps;
function Profile(props: Prop) {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    props.validate().catch((error: AxiosError) => message.error(error.message))
  }, [])
  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    } else if (info.file.status === 'done') {
      const { success, data, massage } = info.file.response;
      if (success) {
        setLoading(false);
        props.setAvatar(data); // 修改store中用户的头像
      } else {
        massage.error(massage)
      }
    }
  }

  let content = null;
  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    // 什么都不做，还是null
    content = null;
  } else if (props.loginState === LOGIN_TYPES.LOGIN) {
    const uploadButton = (
      <div>
        {
          loading ? <LoadingOutlined /> : <UploadOutlined />
        }
        <div className="ant-upload-text">上传</div>
      </div>
    )
    content = (
      <div className="user-info">
        <Descriptions>
          <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
          <Descriptions.Item label="头像">
            <Upload
              name="avatar"
              listType='picture-card'
              className="avatar-upload"
              showUploadList={false}
              action="http://localhost:8888/user/uploadAvatar"
              beforeUpload={beforeUpload}
              data={{ userId: props.user.id }}
              onChange={handleChange}
            >
              {
                props.user.avatar ? (<img src={props.user.avatar} alt="avatar" style={{ width: '100%' }} />) : uploadButton
              }
            </Upload>
          </Descriptions.Item>
        </Descriptions>
        <Button type="primary" onClick={() => props.logout()}>退出登录</Button>
      </div>
    )
  } else if (props.loginState === LOGIN_TYPES.UN_LOGIN) {
    content = (
      <>
        <Alert type="warning" message="当前用户尚未登录" description="亲爱的用户你好，请选择注册或者登录" />
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Button type="dashed" onClick={() => props.history.push('/login')}>登录</Button>
          <Button type="dashed" onClick={() => props.history.push('/register')}>注册</Button>
        </div>
      </>
    )
  }
  return (
    <section>
      <NavBar>个人中心</NavBar>
      {content}
    </section>
  )
}
// 头像上传做验证
function beforeUpload(file: UploadFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您只能上传jpg/png格式的文件');
  }
  const isLessThan2M = file.size / 1024 / 1024 <= 2;
  if (!isLessThan2M) {
    message.error('您只能上传小于2M的文件');
  }
  return isJpgOrPng && isLessThan2M;
}

function mapStateToProps(state: RootState): ProfileState {
  return state.profile
}

export default connect(mapStateToProps, actions)(Profile)