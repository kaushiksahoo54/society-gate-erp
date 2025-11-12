import React from 'react'
export default function StatCard({ title, value, hint }) {
  return (
    <div className="p-5 bg-white rounded-2xl shadow-soft border border-slate-100">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-400">{hint}</div>}
    </div>
  )
}
