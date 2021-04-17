import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, Radio } from 'antd'

function UserForm({ isModalVisible, closeModel, updataUser, userDetail }) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      username: userDetail.username || '',
      password: userDetail.password || '',
      enable: userDetail.enable || true,
      role: userDetail.role || 1
    })
  }, [userDetail])

  const initialValues = {
    username: '',
    password: '',
    enable: true,
    role: 2
  }

  const onCancel = () => {
    form.resetFields()
    closeModel()
  }

  const onOk = async values => {
    try {
      await form.validateFields()
      const values = form.getFieldValue()
      await updataUser({
        ...values,
        id: userDetail.id || null
      })
      form.resetFields()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal forceRender title="Basic Modal" visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        form={form}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="请输入姓名" allowClear autoComplete="off" />
        </Form.Item>
        {!userDetail.username ? (
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input placeholder="请输入密码" allowClear autoComplete="off" />
          </Form.Item>
        ) : (
          ''
        )}
        <Form.Item
          label="状态"
          name="enable"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={true}>启用</Radio.Button>
            <Radio.Button value={false}>禁用</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="role"
          label="角色"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Select placeholder="Select province">
            <Select.Option value={1}>超级管理员</Select.Option>
            <Select.Option value={2}>普通用户</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserForm
