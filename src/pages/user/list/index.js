import React, { useEffect, useState } from 'react'
import {
  Table,
  Tag,
  Space,
  Tooltip,
  Spin,
  Card,
  Form,
  Popconfirm,
  Input,
  Select,
  Button,
  message
} from 'antd'
import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons'

import { getusers, updateUser, del_user } from '@/api/user'
import UseForm from './userForm'

function Index() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState([])
  const [userDetail, setUserDetail] = useState({})
  const [pageConfig, setPageConfig] = useState({
    defaultCurrent: 1,
    pageSize: 5,
    total: 0
  })
  const openModal = () => {
    setIsModalVisible(true)
  }

  const onUpdate = detail => {
    setUserDetail(detail)
    openModal()
  }

  const handleDelUser = async id => {
    const res = await del_user({ id })
    if (res.code === 200) {
      message.success({ content: res.msg })
      setLoading(true)
      getUser({
        pageSize: 1
      })
    }
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
      render: text => <>{text}</>
    },
    {
      title: '状态',
      dataIndex: 'enable',
      key: 'enable',
      render: enable => (
        <>{<Tag color={enable ? 'green' : 'red'}>{enable ? '开启' : '关闭'}</Tag>}</>
      )
    },
    {
      title: '角色',
      key: 'role',
      dataIndex: 'role',
      render: role => (
        <>
          <Tag color={role === 1 ? 'green' : 'geekblue'}>
            {role === 1 ? '超级管理员' : '普通用户'}
          </Tag>
        </>
      )
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: data => <>{data.replace('T', ' ').slice(0, 19)}</>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) =>
        record.id == 1 && record.username === 'admin' ? (
          '_'
        ) : (
          <Space size="middle">
            <Tooltip title="编辑">
              <EditOutlined
                onClick={() => onUpdate(record)}
                style={{ fontSize: 16, color: '#1890ff' }}
              />
            </Tooltip>
            <Tooltip title="权限">
              <FormOutlined style={{ fontSize: 16 }} />
            </Tooltip>
            <Tooltip title="删除">
              <Popconfirm
                onConfirm={() => handleDelUser(record.id)}
                title="Are you sure to delete this task?"
                okText="Yes"
                cancelText="No">
                <DeleteOutlined style={{ fontSize: 16, color: '#ff4d4f' }} />
              </Popconfirm>
            </Tooltip>
          </Space>
        )
    }
  ]

  const getUser = async params => {
    const result = await getusers(params)
    setData(result.data || [])
    setLoading(false)
    setPageConfig({
      defaultCurrent: 1,
      pageSize: 5,
      total: result.count,
      onChange(size) {
        getUser({
          page: size
        })
      }
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  const _updataUser = async values => {
    setLoading(true)
    await updateUser(values)
    await getUser()
    setIsModalVisible(false)
    message.success({
      content: '操作成功'
    })
  }

  const handleSearch = () => {
    const values = form.getFieldValue()
    getUser(values)
  }

  const closeModel = () => {
    setIsModalVisible(false)
    setUserDetail({})
  }

  return (
    <Card>
      <Form style={{ marginBottom: 20 }} form={form} name="horizontal_login" layout="inline">
        <Form.Item name="username">
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item name="role">
          <Select placeholder="请选择角色" allowClear>
            <Select.Option value={1}>超级管理员</Select.Option>
            <Select.Option value={2}>普通用户</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch} htmlType="submit">
              搜索
            </Button>
            <Button type="success" onClick={openModal}>
              添加
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pageConfig}
          rowKey={record => record.id}
        />
      </Spin>
      <UseForm
        updataUser={_updataUser}
        userDetail={userDetail}
        isModalVisible={isModalVisible}
        closeModel={closeModel}
      />
    </Card>
  )
}

export default Index
