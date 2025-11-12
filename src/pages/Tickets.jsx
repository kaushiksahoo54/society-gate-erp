import React, { useState } from 'react'
import { useAppStore } from '../store/appStore'
import Table from '../components/Table'
import Badge from '../components/Badge'

export default function Tickets() {
  const tickets = useAppStore(s => s.tickets)
  const addTicket = useAppStore(s => s.addTicket)
  const updateTicket = useAppStore(s => s.updateTicket)
  const [form, setForm] = useState({ title: '', unit: '', priority: 'Low', status: 'Open' })

  const submit = (e) => {
    e.preventDefault()
    if (!form.title) return
    addTicket({ ...form, createdAt: new Date().toISOString().slice(0,10) })
    setForm({ title: '', unit: '', priority: 'Low', status: 'Open' })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="font-semibold text-slate-800 mb-3">New Maintenance Ticket</div>
        <form onSubmit={submit} className="grid md:grid-cols-5 gap-3">
          <input placeholder="Issue title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200" />
          <input placeholder="Unit (optional)" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200" />
          <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200">
            <option>Low</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200">
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <button className="px-4 py-2 rounded-xl bg-brand-600 text-white">Create</button>
        </form>
      </div>

      <Table
        columns={[
          { header: 'ID', accessor: 'id' },
          { header: 'Title', accessor: 'title' },
          { header: 'Unit', accessor: 'unit' },
          { header: 'Priority', accessor: 'priority', cell: r => <Badge>{r.priority}</Badge> },
          { header: 'Status', accessor: 'status', cell: r => (
            <select value={r.status} onChange={e => updateTicket(r.id, { status: e.target.value })} className="px-2 py-1 rounded-lg border border-slate-200 text-xs">
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          ) },
          { header: 'Created', accessor: 'createdAt' }
        ]}
        data={tickets}
      />
    </div>
  )
}
