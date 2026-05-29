import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  CreditCard,
  UserCheck,
  Award,
  LogOut,
} from 'lucide-react'

const links = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/registrations', label: 'Registrations', icon: Users },
  { to: '/app/add', label: 'Add Student', icon: PlusCircle },
  { to: '/app/payments', label: 'Payments', icon: CreditCard },
  { to: '/app/trainers', label: 'Trainers', icon: UserCheck },
  { to: '/app/certificates', label: 'Certificates', icon: Award },
]

export default function Layout() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('workshoppro_logged_in')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-72 bg-slate-950 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
              W
            </div>

            <div>
              <h1 className="text-2xl font-bold">WorkshopPro</h1>
              <p className="text-xs text-slate-400">
                IoT Training Dashboard
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/app'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="px-6 pb-4 text-xs text-slate-500">
          Built by Shravani Reddy
        </div>

        <button
          onClick={logout}
          className="m-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      <main className="flex-1 min-h-screen overflow-auto">
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <h2 className="font-semibold text-slate-800">
            IoT Workshop Management System
          </h2>
          <p className="text-sm text-slate-500">
            Manage registrations, payments, trainers, and certificates.
          </p>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}