import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { useStore } from '@/store'

const { Option } = Select

const Publish = () => {
  const { channelStore } = useStore()
  const [fileList, setFileList] = useState()
  const onUploadChange = (fileList) => {
    console.log(fileList)
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ content: '' }}>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 上传组件 */}
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
              action="http://geek.itheima.net/v1_0/upload"
              fileList={fileList}
              onChange={onUploadChange}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
