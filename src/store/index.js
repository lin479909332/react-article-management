import React from 'react'
import LoginStore from './login.Store'
class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
  }
}

// 实例化
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = React.useContext(context)

export { useStore }
