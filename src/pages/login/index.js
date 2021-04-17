import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import './index.less'
import { login } from '@/api'
import { getUserInfo } from '../../store/actions/user'
import { setStorage } from '../../utils'

const mapDispatchToProps = dispatch => ({
  _getUserInfo: dispatch(getUserInfo)
})

function Login({ _getUserInfo, history }) {
  const onFinish = async values => {
    const res = await login({
      username: values.username,
      password: values.password
    })
    setStorage('hc-token', res.data.token)
    await _getUserInfo({ token: res.data.token })
    history.push('/admin/user/list')
  }

  return (
    <div className="login-wrapper">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!'
            }
          ]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(React.memo(Login))
