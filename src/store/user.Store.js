import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import { http } from '@/utils'
class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    const res = await http.get('/user/profile')
    if (res) {
      this.userInfo = res.data
    } else {
      message.error('获取用户数据失败，请尝试刷新页面')
    }
  }
}

export default UserStore
