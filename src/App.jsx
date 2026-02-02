import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PrivateRoutes from './components/PrivateRoutes'


//pages
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './utils/AuthContext'
import RegisterPage from './pages/RegisterPage'
import Chats from './pages/Chats'

export const appName = "Thetha'Nam"
import appIcon from "./assets/thetha'nam-icon2.jpg"

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <title>{appName}</title>
      
    <link rel="icon" type="image/svg+xml" href={appIcon} />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path='/' element={<Chats />} />
            </Route>
          </Routes>
        </AuthProvider>

      </Router>
    </>
  )
};

export default App
