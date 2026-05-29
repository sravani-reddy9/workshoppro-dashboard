import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('admin@workshoppro.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    if (email === 'admin@workshoppro.com' && password === 'admin123') {
      localStorage.setItem('workshoppro_logged_in', 'true')
      navigate('/app')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-slate-900">WorkshopPro</h1>
        <p className="text-slate-500 mt-2">Admin login for IoT workshop management</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input className="w-full mt-1 border rounded-xl px-4 py-3" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" className="w-full mt-1 border rounded-xl px-4 py-3" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
