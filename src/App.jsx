import React from 'react'
import clsx from 'clsx'
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

function SidebarLink({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        clsx(
          'flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors',
          collapsed && 'justify-center',
          isActive
            ? 'bg-brand-50 text-brand-700 font-semibold shadow-soft border border-brand-100'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
        )
      }
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-semibold uppercase tracking-wide text-slate-600">
        {icon}
      </span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  )
}

export default function App() {
  const sidebarOpen = useAppStore(s => s.sidebarOpen)
  const toggleSidebar = useAppStore(s => s.toggleSidebar)
  const collapsed = !sidebarOpen

  const navigation = [
    { to: '/', label: 'Dashboard', icon: 'DB' },
    { to: '/visitors', label: 'Visitors', icon: 'VS' },
    { to: '/residents', label: 'Residents', icon: 'RS' },
    { to: '/billing', label: 'Billing', icon: 'BL' },
    { to: '/tickets', label: 'Tickets', icon: 'TK' },
    { to: '/announcements', label: 'Announcements', icon: 'AN' },
    { to: '/staff', label: 'Staff', icon: 'ST' },
    { to: '/marketplace', label: 'Marketplace', icon: 'MP' },
    { to: '/settings', label: 'Settings', icon: 'SE' }
  ]

  return (
    <div className="min-h-screen flex">
      <aside
        className={clsx(
          'bg-white border-r border-slate-200 transition-all duration-300 p-3 flex flex-col gap-4',
          sidebarOpen ? 'w-72' : 'w-20 items-center'
        )}
      >
        <div className={clsx('flex items-center gap-3 px-2 py-2', collapsed && 'justify-center')}>
          <div className="h-10 w-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold shadow-soft">SG</div>
          {!collapsed && (
            <div>
              <div className="font-bold text-slate-800">Society Gate</div>
              <div className="text-xs text-slate-500">ERP &amp; Visitor Suite</div>
            </div>
          )}
        </div>
        <nav className={clsx('flex flex-col gap-2 mt-2 w-full', collapsed && 'items-center')}>
          {navigation.map(item => (
            <SidebarLink key={item.to} {...item} collapsed={collapsed} />
          ))}
        </nav>
        <div className="mt-auto">
          <button
            onClick={toggleSidebar}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={clsx(
              'w-full px-3 py-2 rounded-xl bg-slate-900 text-white text-sm flex items-center justify-center gap-2 transition-colors hover:bg-slate-800',
              collapsed && 'px-0'
            )}
          >
            <svg
              className={clsx('h-4 w-4 transition-transform', sidebarOpen && 'rotate-180')}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.78 5.22a.75.75 0 0 1 0 1.06L9.56 9.5l3.22 3.22a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
            {!collapsed && <span>Toggle Sidebar</span>}
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