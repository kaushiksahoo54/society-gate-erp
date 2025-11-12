import React from 'react'

export default function Settings() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="font-semibold text-slate-800 mb-3">Gate & Security</div>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-700">OTP required for Guest entry</span>
            <input type="checkbox" className="h-5 w-10 rounded-full accent-brand-600" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Auto alert on Overstay</span>
            <input type="checkbox" className="h-5 w-10 rounded-full accent-brand-600" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Enable Vehicle QR</span>
            <input type="checkbox" className="h-5 w-10 rounded-full accent-brand-600" defaultChecked />
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="font-semibold text-slate-800 mb-3">ERP Preferences</div>
        <div className="grid grid-cols-2 gap-3">
          <select className="px-3 py-2 rounded-xl border border-slate-200">
            <option>INR (₹)</option>
            <option>USD ($)</option>
          </select>
          <select className="px-3 py-2 rounded-xl border border-slate-200">
            <option>India Standard Time</option>
            <option>UTC</option>
          </select>
          <input placeholder="Society Name" className="px-3 py-2 rounded-xl border border-slate-200 col-span-2" defaultValue="Green Meadows Residency" />
        </div>
      </div>
    </div>
  )
}
