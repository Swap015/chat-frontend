import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import FrontendUpload from './Components/frontendUpload'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/a" element={< Register />} />
          <Route path="/login" element={< Login />} />
          <Route path="/" element={< FrontendUpload />} />
          <Route path="/dashboard"
            element={
              <Dashboard />
            } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
