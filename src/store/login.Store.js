// login module

import { makeAutoObservable } from 'mobx'
import { http, getToken, setToken, removeToken } from '@/utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  // 发送登录请求并存入token
  getToken = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', { mobile, code })
    // 存入token
    this.token = res.data.token
    setToken(this.token)
  }
  // 退出登录
  logOut = () => {
    this.token = ''
    removeToken()
  }
}

export default LoginStore
