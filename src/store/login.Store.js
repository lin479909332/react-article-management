// login module

import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class LoginStore {
  token = ''
  constructor() {
    makeAutoObservable(this)
  }
  // 发送登录请求并存入token
  setToken = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', { mobile, code })
    // 存入token
    this.token = res.data
  }
}

export default LoginStore
