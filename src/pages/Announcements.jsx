import React, { useState } from 'react'
import { useAppStore } from '../store/appStore'

export default function Announcements() {
  const announcements = useAppStore(s => s.announcements)
  const [form, setForm] = useState({ title: '', body: '' })
  const add = () => {
    if (!form.title) return
    useAppStore.setState(s => ({
      announcements: [{ id: Date.now(), date: new Date().toISOString().slice(0,10), ...form }, ...s.announcements]
    }))
    setForm({ title: '', body: '' })
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="font-semibold text-slate-800 mb-3">Recent Announcements</div>
          <ul className="space-y-3">
            {announcements.map(a => (
              <li key={a.id} className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50">
                <div className="text-sm font-medium text-slate-800">{a.title}</div>
                <div className="text-xs text-slate-500">{a.body}</div>
                <div className="text-xs text-slate-400 mt-1">{a.date}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-1">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="font-semibold text-slate-800 mb-3">Post Announcement</div>
          <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full mb-2 px-3 py-2 rounded-xl border border-slate-200" />
          <textarea placeholder="Message" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} className="w-full h-28 mb-3 px-3 py-2 rounded-xl border border-slate-200" />
          <button onClick={add} className="px-4 py-2 rounded-xl bg-brand-600 text-white w-full">Publish</button>
        </div>
      </div>
    </div>
  )
}
