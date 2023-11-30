import React from 'react'
import LoginStore from './login.Store'
import UserStore from './user.Store'
import ChannelStore from './channel.Store'
class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}

// 实例化
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export { useStore }
