import React, { useEffect, useState } from 'react'
import { Table, Space, Tooltip, Spin, Card, Form, Input, Modal, Select, Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { getroles } from '@/api/user'

function Index() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  let [data, setData] = useState([])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: _ => <>{_ === 1 ? '超级管理员' : '用户'}</>
    },
    {
      title: '描述',
      key: 'description',
      dataIndex: 'description',
      render: description => <>{description}</>
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: data => <>{data.replace('T', ' ').slice(0, 19)}</>
    },
    {
      title: '修改时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: data => <>{data.replace('T', ' ').slice(0, 19)}</>
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) =>
        record.role === 1 ? (
          '_'
        ) : (
          <Space size="middle">
            <Tooltip title="编辑">
              <EditOutlined onClick={showModal} style={{ fontSize: 16, color: '#1890ff' }} />
            </Tooltip>
            <Tooltip title="删除">
              <DeleteOutlined style={{ fontSize: 16, color: '#ff4d4f' }} />
            </Tooltip>
          </Space>
        )
    }
  ]

  const openModal = () => {
    setIsModalVisible(true)
  }

  useEffect(() => {
    const getUser = async () => {
      const result = await getroles()
      setData(result.data || [])
      setLoading(false)
    }
    getUser()
  }, [])

  return (
    <Card>
      <Button type="primary" style={{ marginBottom: 20 }} onClick={openModal}>
        添加
      </Button>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          pagination={false}
          dataSource={data}
          rowKey={record => record.id}
        />
      </Spin>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Card>
  )
}

export default Index
