import { useState, useEffect } from 'react'
import { Layout, Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import './index.scss'
import { useStore } from '@/store'
const { Header, Sider } = Layout

const GeekLayout = () => {
  const { userStore, loginStore } = useStore()
  const [selectedKey, setSelectedKey] = useState('1')
  const navigate = useNavigate()
  // 动态设置高亮菜单
  const menuClick = (e) => {
    setSelectedKey(e.key)
  }
  // 获取用户信息
  useEffect(() => {
    userStore.getUserInfo()
  }, [userStore])
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
            onClick={menuClick}
          >
            <Menu.Item icon={<HomeOutlined />} key="1">
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="2">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="3">
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
