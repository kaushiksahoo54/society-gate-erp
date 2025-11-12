import React from 'react'
import { useAppStore } from '../store/appStore'
import Table from '../components/Table'

export default function Residents() {
  const residents = useAppStore(s => s.residents)
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="font-semibold text-slate-800 mb-3">Residents Directory</div>
        <Table
          columns={[
            { header: 'Unit', accessor: 'id' },
            { header: 'Owner', accessor: 'owner' },
            { header: 'Phone', accessor: 'phone' },
            { header: 'Vehicles', accessor: 'vehicles' },
            { header: 'Members', accessor: 'members' },
            { header: 'Dues (₹)', accessor: 'dues' }
          ]}
          data={residents}
        />
      </div>
    </div>
  )
}
