import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
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
  // 获取路径里的id
  const [params] = useSearchParams()
  const id = params.get('id')
  // 数据回填
  const formRef = useRef()
  useEffect(() => {
    const getArticle = async () => {
      const res = await http.get(`/mp/articles/${id}`)
      if (res.message === 'OK') {
        const { data } = res
        formRef.current.setFieldsValue({ ...data, type: data.cover.type })
        const imageList = data.cover.images.map((url) => ({ url }))
        // 回填upload组件（照片墙）里的图片数据
        setFileList(imageList)
        // 暂存列表也保存一份
        fileListRef.current = imageList
      } else {
        message.error('获取文章失败')
      }
    }
    if (id) {
      getArticle()
    }
  }, [id])
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
    const count = e.target.value
    setImgCount(count)
    if (count === 0) {
      return false
    }
    if (count === 1) {
      const firstImg = fileListRef.current ? fileListRef.current[0] : null
      setFileList(firstImg ? [firstImg] : [])
    } else if (count === 3) {
      setFileList(fileListRef.current)
    }
  }

  // 上传文章
  const navigate = useNavigate()
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
    if (id) {
      const res = await http.put(`/mp/articles/${id}?draft=false`, params)
      if (res.message === 'OK') {
        navigate('/article')
        message.success('更新成功')
      } else {
        message.error('更新失败')
      }
    } else {
      const res = await http.post('/mp/articles?draft=false', params)
      if (res.message === 'OK') {
        navigate('/article')
        message.success('发布成功')
      } else {
        message.error('发布失败')
      }
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
            <Breadcrumb.Item>{id ? '编辑' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ content: '' }}
          onFinish={onFinish}
          ref={formRef}
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
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
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
                {id ? '更新' : '发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
