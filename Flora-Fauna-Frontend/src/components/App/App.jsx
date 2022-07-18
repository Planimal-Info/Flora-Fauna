import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from '../../assets/react.svg'
import AccessForbidden from '../AccessForbidden/AccessForbidden'
import LandingPage from '../LandingPage/LandingPage'
import LoginPage from '../LoginPage/LoginPage'
import Navbar from '../Navbar/Navbar'
import NotFound from '../NotFound/NotFound'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import './App.css'

export default function App() {

  const [user, setUser] = useState({})
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoading={isLoading} />
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/denied" element={<AccessForbidden />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
