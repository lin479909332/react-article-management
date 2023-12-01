import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { useStore } from '@/store'
import { http } from '@/utils'

const { Option } = Select

const Publish = () => {
  const { channelStore } = useStore()
  const [fileList, setFileList] = useState()
  // 声明暂存图片仓库
  const fileListRef = useRef()
  // 上传图片
  const onUploadChange = (info) => {
    const fileList = info.fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url,
        }
      }
      return file
    })
    setFileList(fileList)
    // 将图片url暂存至仓库
    fileListRef.current = fileList
  }

  const [imgCount, setImgCount] = useState(1)
  // radio状态切换
  const radioChange = (e) => {
    setImgCount(e.target.value)
  }
  // 监听imgCount变化来改变图片墙
  useEffect(() => {
    if (imgCount === 1) {
      const firstImg = fileListRef.current ? fileListRef.current[0] : null
      setFileList(firstImg ? [firstImg] : [])
    } else if (imgCount === 3) {
      setFileList(fileListRef.current)
    }
  }, [imgCount])
  // 上传文章
  const onFinish = async (values) => {
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type,
        images: fileList.map((item) => item.url),
      },
    }
    const res = await http.post('/mp/articles?draft=false', params)
    if (res.message === 'OK') {
      message.success('发布成功')
    } else {
      message.error('发布失败')
    }
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
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ content: '' }}
          onFinish={onFinish}
        >
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
              <Radio.Group onChange={radioChange} defaultValue={1}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              // 上传组件
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
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
