import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Registrations from './pages/Registrations.jsx'
import AddRegistration from './pages/AddRegistration.jsx'
import Payments from './pages/Payments.jsx'
import Trainers from './pages/Trainers.jsx'
import Certificates from './pages/Certificates.jsx'
import Layout from './components/Layout.jsx'

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('workshoppro_logged_in') === 'true'
  return isLoggedIn ? children : <Navigate to="/" />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="registrations" element={<Registrations />} />
        <Route path="add" element={<AddRegistration />} />
        <Route path="payments" element={<Payments />} />
        <Route path="trainers" element={<Trainers />} />
        <Route path="certificates" element={<Certificates />} />
      </Route>
    </Routes>
  )
}
