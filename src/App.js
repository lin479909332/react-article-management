import { Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthComponent } from './components/AuthComponent'
import { history, HistoryRouter } from '@/utils'
import { lazy, Suspense } from 'react'

const GeekLayout = lazy(() => import('@/pages/Layout'))
const Login = lazy(() => import('@/pages/Login'))
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Suspense
          fallback={
            <div style={{ textAlign: 'center', color: 'red', marginTop: 200 }}>Loading...</div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <AuthComponent>
                  <GeekLayout />
                </AuthComponent>
              }
            >
              <Route index element={<Home />} />
              <Route path="article" element={<Article />} />
              <Route path="publish" element={<Publish />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  )
}

export default App
