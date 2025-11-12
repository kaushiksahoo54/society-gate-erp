import React from 'react'
import { useAppStore } from '../store/appStore'
import Table from '../components/Table'

export default function Staff() {
  const staff = useAppStore(s => s.staff)
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="font-semibold text-slate-800 mb-3">Staff & Guards</div>
        <Table
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Name', accessor: 'name' },
            { header: 'Role', accessor: 'role' },
            { header: 'Shift', accessor: 'shift' },
            { header: 'Phone', accessor: 'phone' },
          ]}
          data={staff}
        />
      </div>
    </div>
  )
}
