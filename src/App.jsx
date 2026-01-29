import { useState } from 'react'
import './App.css'
import Room from './pages/Room'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PrivateRoutes from './components/PrivateRoutes'


//pages
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './utils/AuthContext'



function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>

    </Router>
  )
};

export default App
