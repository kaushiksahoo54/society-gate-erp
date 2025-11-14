// src/App.jsx
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
import Marketplace from './pages/Marketplace'

function Icon({ children }) {
  return <div className="h-10 w-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-semibold shadow-soft">{children}</div>
}

function SidebarLink({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        'flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-150 ' +
        (isActive ? 'bg-slate-100 text-brand-700 font-semibold' : 'text-slate-700 hover:bg-slate-50')
      }
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className={`overflow-hidden transition-all duration-200 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
        <div className="text-sm">{label}</div>
      </div>
    </NavLink>
  )
}

export default function App() {
  const sidebarOpen = useAppStore(s => s.sidebarOpen)
  const toggleSidebar = useAppStore(s => s.toggleSidebar)

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside
        className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col gap-3 p-3 ${sidebarOpen ? 'w-72' : 'w-20'}`}
        aria-expanded={sidebarOpen}
      >
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="h-10 w-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold shadow-soft">SG</div>
          <div className={`transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="font-bold text-slate-800">Society Gate</div>
            <div className="text-xs text-slate-500">ERP & Visitor Suite</div>
          </div>
        </div>

        <nav className="flex flex-col gap-2 mt-2">
          <SidebarLink to="/" icon={<Icon>🏠</Icon>} label="Dashboard" collapsed={!sidebarOpen} />
          <SidebarLink to="/visitors" icon={<Icon>🚪</Icon>} label="Visitors" collapsed={!sidebarOpen} />
          <SidebarLink to="/residents" icon={<Icon>👥</Icon>} label="Residents" collapsed={!sidebarOpen} />
          <SidebarLink to="/billing" icon={<Icon>💰</Icon>} label="Billing" collapsed={!sidebarOpen} />
          <SidebarLink to="/tickets" icon={<Icon>🧰</Icon>} label="Tickets" collapsed={!sidebarOpen} />
          <SidebarLink to="/announcements" icon={<Icon>📢</Icon>} label="Announcements" collapsed={!sidebarOpen} />
          <SidebarLink to="/staff" icon={<Icon>🧑‍🔧</Icon>} label="Staff" collapsed={!sidebarOpen} />
          <SidebarLink to="/marketplace" icon={<Icon>🛍️</Icon>} label="Marketplace" collapsed={!sidebarOpen} />
          <SidebarLink to="/settings" icon={<Icon>⚙️</Icon>} label="Settings" collapsed={!sidebarOpen} />
        </nav>

        <div className="mt-auto">
          <button
            onClick={toggleSidebar}
            aria-pressed={sidebarOpen}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900 text-white text-sm justify-center"
          >
            <span className="text-sm">{sidebarOpen ? 'Collapse' : 'Open'}</span>
          </button>
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
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
