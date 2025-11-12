import React from 'react'
import { ResponsiveContainer, LineChart as LC, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function LineChart({ data }) {
  return (
    <div className="h-64 w-full bg-white rounded-2xl border border-slate-200 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LC data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} dot={false} />
        </LC>
      </ResponsiveContainer>
    </div>
  )
}
