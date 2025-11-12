import React from 'react'
import clsx from 'clsx'

const colorMap = {
  Paid: 'bg-green-100 text-green-700',
  Unpaid: 'bg-yellow-100 text-yellow-700',
  Overdue: 'bg-red-100 text-red-700',
  Open: 'bg-red-100 text-red-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Resolved: 'bg-green-100 text-green-700',
  High: 'bg-orange-100 text-orange-700',
  Critical: 'bg-red-100 text-red-700',
  Low: 'bg-slate-100 text-slate-700'
}

export default function Badge({ children }) {
  return (
    <span className={clsx('px-2 py-1 rounded-full text-xs font-medium', colorMap[children] || 'bg-slate-100 text-slate-700')}>
      {children}
    </span>
  )
}
