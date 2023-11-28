import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import logo from '@/assets/logo.png'
import './index.scss'
const Login = () => {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    await loginStore.getToken({
      mobile: values.mobile,
      code: values.password,
    })
    try {
      navigate('/', { replace: true })
      message.success('登录成功')
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          initialValues={{ remember: true }}
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern:
                  /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/,
                message: '手机号格式不正确',
                validateTrigger: 'onBlur',
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              {
                len: 6,
                message: '密码格式不正确',
                validateTrigger: 'onBlur',
              },
            ]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
