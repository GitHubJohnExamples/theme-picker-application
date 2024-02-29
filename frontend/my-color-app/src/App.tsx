import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import SetColorOne from './components/SetColorOne'
import SetColorTwo from './components/SetColorTwo'

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="app-title">
        <h2>Theme Picker</h2>
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/first/*" element={<SetColorOne />} />
        <Route path="/second" element={<SetColorTwo />} />
      </Routes>
    </div>
  )
}

export default App
