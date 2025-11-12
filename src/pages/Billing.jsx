import React, { useState } from 'react'
import { useAppStore } from '../store/appStore'
import Table from '../components/Table'
import Badge from '../components/Badge'

export default function Billing() {
  const invoices = useAppStore(s => s.invoices)
  const addInvoice = useAppStore(s => s.addInvoice)
  const [form, setForm] = useState({ unit: '', month: 'Nov 2025', amount: 0, status: 'Unpaid', dueDate: '' })

  const submit = (e) => {
    e.preventDefault()
    if (!form.unit || !form.amount || !form.dueDate) return
    addInvoice(form)
    setForm({ unit: '', month: 'Nov 2025', amount: 0, status: 'Unpaid', dueDate: '' })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="font-semibold text-slate-800 mb-3">Create Invoice</div>
        <form onSubmit={submit} className="grid md:grid-cols-6 gap-3">
          <input placeholder="Unit" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200" />
          <input placeholder="Month (e.g. Nov 2025)" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200" />
          <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} className="px-3 py-2 rounded-xl border border-slate-200" />
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200">
            <option>Unpaid</option>
            <option>Paid</option>
            <option>Overdue</option>
          </select>
          <input type="date" placeholder="Due date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200" />
          <button className="px-4 py-2 rounded-xl bg-brand-600 text-white">Add</button>
        </form>
      </div>

      <Table
        columns={[
          { header: 'Invoice', accessor: 'id' },
          { header: 'Unit', accessor: 'unit' },
          { header: 'Month', accessor: 'month' },
          { header: 'Amount (₹)', accessor: 'amount' },
          { header: 'Status', accessor: 'status', cell: r => <Badge>{r.status}</Badge> },
          { header: 'Due', accessor: 'dueDate' }
        ]}
        data={invoices}
      />
    </div>
  )
}
