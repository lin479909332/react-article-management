import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Button } from 'antd'
import './App.css'
import Layout from './pages/Layout'
import Login from '@/pages/Login'
import { AuthComponent } from './components/AuthComponent'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Button type="primary">Button</Button>
        <Routes>
          <Route
            path="/"
            element={
              <AuthComponent>
                <Layout />
              </AuthComponent>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
