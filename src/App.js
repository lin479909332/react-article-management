import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Button } from 'antd'
import './App.css'
import Layout from './pages/Layout'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Button type="primary">Button</Button>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
