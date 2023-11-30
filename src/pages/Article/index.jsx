import { Link } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
  message,
} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import img404 from '@/assets/error.png'
import { http } from '@/utils'
import { useEffect } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  // 频道列表
  const [channelList, setChannelList] = useState([])

  // 获取频道列表
  useEffect(() => {
    const getChannelList = async () => {
      const res = await http.get('/channels')
      if (res) {
        setChannelList(res.data.channels)
      } else {
        message.error('获取频道列表失败')
      }
    }
    getChannelList()
  }, [])

  // 文章列表数据管理
  const [article, setArticleList] = useState({
    list: [],
    count: 0,
  })

  // 参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  })

  // 获取文章列表
  useEffect(() => {
    const getArticleList = async () => {
      const res = await http.get('/mp/articles', { params })
      if (res) {
        const { results, total_count } = res.data
        setArticleList({
          list: results,
          count: total_count,
        })
      } else {
        message.error('获取文章列表失败')
      }
    }
    getArticleList()
  }, [params])

  const onFinish = (values) => {
    console.log(values)
  }
  // 表格列
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
          </Space>
        )
      },
    },
  ]
  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: -1 }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 200 }}>
              {channelList.map((channel) => (
                <Option key={channel.id} value={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 count 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={article.list} />
      </Card>
    </div>
  )
}

export default Article
