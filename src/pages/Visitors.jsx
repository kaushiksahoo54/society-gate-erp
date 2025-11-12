import React, { useState } from 'react'
import { useAppStore } from '../store/appStore'
import Table from '../components/Table'

export default function Visitors() {
  const visitors = useAppStore(s => s.visitors)
  const addVisitor = useAppStore(s => s.addVisitor)
  const checkoutVisitor = useAppStore(s => s.checkoutVisitor)
  const [form, setForm] = useState({ name: '', purpose: 'Guest', flat: '', vehicle: '' })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.flat) return
    addVisitor({ ...form, inTime: new Date().toTimeString().slice(0,5), outTime: null })
    setForm({ name: '', purpose: 'Guest', flat: '', vehicle: '' })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="font-semibold text-slate-800 mb-3">New Visitor Check-in</div>
        <form onSubmit={submit} className="grid md:grid-cols-5 gap-3">
          <input placeholder="Visitor name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200" />
          <select value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200">
            <option>Guest</option>
            <option>Delivery</option>
            <option>Maintenance</option>
            <option>Cab</option>
          </select>
          <input placeholder="Flat (e.g. A-302)" value={form.flat} onChange={e => setForm({ ...form, flat: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200" />
          <input placeholder="Vehicle (optional)" value={form.vehicle} onChange={e => setForm({ ...form, vehicle: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200" />
          <button className="px-4 py-2 rounded-xl bg-brand-600 text-white">Check-in</button>
        </form>
      </div>

      <Table
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Purpose', accessor: 'purpose' },
          { header: 'Flat', accessor: 'flat' },
          { header: 'Vehicle', accessor: 'vehicle' },
          { header: 'In Time', accessor: 'inTime' },
          { header: 'Out Time', accessor: 'outTime', cell: r => r.outTime || <button onClick={() => checkoutVisitor(r.id)} className="px-2 py-1 rounded-lg bg-slate-900 text-white text-xs">Checkout</button> },
        ]}
        data={visitors}
      />
    </div>
  )
}
