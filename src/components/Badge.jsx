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
  Low: 'bg-slate-100 text-slate-700',
  Available: 'bg-emerald-100 text-emerald-700',
  Sold: 'bg-slate-200 text-slate-700',
  'Brand New': 'bg-emerald-50 text-emerald-600',
  'Like New': 'bg-sky-50 text-sky-600',
  'Gently Used': 'bg-amber-50 text-amber-600',
  'Well Loved': 'bg-rose-50 text-rose-600',
  Service: 'bg-brand-50 text-brand-600',
  Services: 'bg-brand-50 text-brand-600',
  Furniture: 'bg-amber-50 text-amber-600',
  Electronics: 'bg-indigo-50 text-indigo-600',
  'Home Appliances': 'bg-slate-50 text-slate-600',
  Vehicles: 'bg-lime-50 text-lime-600',
  'Books & Learning': 'bg-purple-50 text-purple-600',
  'Sports & Fitness': 'bg-cyan-50 text-cyan-600',
  Miscellaneous: 'bg-slate-100 text-slate-700'
}

export default function Badge({ children }) {
  return (
    <span className={clsx('px-2 py-1 rounded-full text-xs font-medium', colorMap[children] || 'bg-slate-100 text-slate-700')}>
      {children}
    </span>
  )
}