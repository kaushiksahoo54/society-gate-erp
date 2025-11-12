import React from 'react'
import { useAppStore } from '../store/appStore'
import StatCard from '../components/StatCard'
import LineChart from '../components/LineChart'
import Table from '../components/Table'
import Badge from '../components/Badge'

export default function Dashboard() {
  const visitors = useAppStore(s => s.visitors)
  const tickets = useAppStore(s => s.tickets)
  const invoices = useAppStore(s => s.invoices)

  const revenueData = [
    { name: 'Jun', amount: 112000 },
    { name: 'Jul', amount: 121500 },
    { name: 'Aug', amount: 118400 },
    { name: 'Sep', amount: 128900 },
    { name: 'Oct', amount: 137200 },
    { name: 'Nov', amount: 142300 },
  ]

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 grid grid-cols-4 gap-4">
        <StatCard title="Active Visitors" value={visitors.filter(v => !v.outTime).length} hint="Checked-in at gates" />
        <StatCard title="Open Tickets" value={tickets.filter(t => t.status !== 'Resolved').length} hint="Maintenance & complaints" />
        <StatCard title="Unpaid Invoices" value={invoices.filter(i => i.status !== 'Paid').length} hint="Including overdue" />
        <StatCard title="Occupancy" value="94%" hint="Units occupied" />
      </div>

      <div className="col-span-12 md:col-span-8">
        <LineChart data={revenueData} />
      </div>
      <div className="col-span-12 md:col-span-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 h-full">
          <div className="font-semibold text-slate-800 mb-3">Announcements</div>
          <ul className="space-y-3">
            {useAppStore.getState().announcements.map(a => (
              <li key={a.id} className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50">
                <div className="text-sm font-medium text-slate-800">{a.title}</div>
                <div className="text-xs text-slate-500">{a.body}</div>
                <div className="text-xs text-slate-400 mt-1">{a.date}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="col-span-12">
        <div className="font-semibold text-slate-800 mb-3">Recent Visitors</div>
        <Table
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Purpose', accessor: 'purpose' },
            { header: 'Flat', accessor: 'flat' },
            { header: 'Vehicle', accessor: 'vehicle' },
            { header: 'In', accessor: 'inTime' },
            { header: 'Out', accessor: 'outTime', cell: r => r.outTime || <Badge>Open</Badge> },
          ]}
          data={visitors.slice(0,5)}
        />
      </div>
    </div>
  )
}
