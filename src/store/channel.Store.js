import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import { http } from '@/utils'
class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  getChannelList = async () => {
    const res = await http.get('/channels')
    if (res) {
      this.channelList = res.data.channels
    } else {
      message.error('获取频道列表失败')
    }
  }
}

export default ChannelStore
