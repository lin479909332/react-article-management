import { useEffect } from 'react'
import { Layout, Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import './index.scss'
import { useStore } from '@/store'
const { Header, Sider } = Layout

const GeekLayout = () => {
  const { userStore, loginStore, channelStore } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const selectedKey = location.pathname
  // 获取用户信息和频道数据
  useEffect(() => {
    userStore.getUserInfo()
    channelStore.getChannelList()
  }, [userStore, channelStore])
  // 退出登录
  const logOut = () => {
    loginStore.logOut()
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm onConfirm={logOut} title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)
