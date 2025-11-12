import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { useAppStore } from './store/appStore'
import Dashboard from './pages/Dashboard'
import Visitors from './pages/Visitors'
import Residents from './pages/Residents'
import Billing from './pages/Billing'
import Tickets from './pages/Tickets'
import Announcements from './pages/Announcements'
import Staff from './pages/Staff'
import Settings from './pages/Settings'

function SidebarLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        'flex items-center gap-3 px-4 py-2 rounded-xl transition hover:bg-slate-100 ' +
        (isActive ? 'bg-slate-100 text-brand-700 font-semibold' : 'text-slate-700')
      }
    >
      {children}
    </NavLink>
  )
}

export default function App() {
  const sidebarOpen = useAppStore(s => s.sidebarOpen)
  const toggleSidebar = useAppStore(s => s.toggleSidebar)

  return (
    <div className="min-h-screen flex">
      <aside className={(sidebarOpen ? 'w-72' : 'w-20') + ' bg-white border-r border-slate-200 transition-all duration-300 p-3 flex flex-col gap-3'}>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="h-10 w-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold shadow-soft">SG</div>
          {sidebarOpen && <div>
            <div className="font-bold text-slate-800">Society Gate</div>
            <div className="text-xs text-slate-500">ERP & Visitor Suite</div>
          </div>}
        </div>
        <nav className="flex flex-col gap-2 mt-2">
          <SidebarLink to="/">Dashboard</SidebarLink>
          <SidebarLink to="/visitors">Visitors</SidebarLink>
          <SidebarLink to="/residents">Residents</SidebarLink>
          <SidebarLink to="/billing">Billing</SidebarLink>
          <SidebarLink to="/tickets">Tickets</SidebarLink>
          <SidebarLink to="/announcements">Announcements</SidebarLink>
          <SidebarLink to="/staff">Staff</SidebarLink>
          <SidebarLink to="/settings">Settings</SidebarLink>
        </nav>
        <div className="mt-auto">
          <button onClick={toggleSidebar} className="w-full px-3 py-2 rounded-xl bg-slate-900 text-white text-sm">Toggle</button>
        </div>
      </aside>

      <main className="flex-1">
        <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-lg font-semibold text-slate-800">Society Control Center</div>
            <div className="flex items-center gap-3">
              <input placeholder="Search anything..." className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white grid place-items-center font-semibold">S</div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/visitors" element={<Visitors />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
