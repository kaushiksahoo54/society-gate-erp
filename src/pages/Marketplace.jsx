cat > src/pages/Marketplace.jsx <<'JS'
import React, { useState } from 'react'
import { useAppStore } from '../store/appStore'
import ProductCard from '../components/ProductCard'

export default function Marketplace() {
  const products = useAppStore(s => s.products)
  const categories = useAppStore(s => s.categories)
  const addProduct = useAppStore(s => s.addProduct)
  const buyProduct = useAppStore(s => s.buyProduct)

  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState({ title: '', category: categories[0] || '', description: '', price: 0, qty: 1, seller: '' })

  const visible = products.filter(p => filter === 'All' ? true : p.category === filter)

  const submit = (e) => {
    e.preventDefault()
    if (!form.title || !form.category || !form.price) return
    addProduct(form)
    setForm({ title: '', category: categories[0] || '', description: '', price: 0, qty: 1, seller: '' })
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Marketplace</h3>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 rounded-2xl border border-slate-200">
              <option>All</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {visible.length === 0 ? <div className="p-6 text-slate-500">No items in this category.</div> : visible.map(p => (
              <ProductCard key={p.id} product={p} onBuy={() => {
                const buyer = 'DemoBuyer'
                const res = buyProduct(p.id, buyer)
                if (!res.success) alert(res.message)
              }} />
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <h4 className="font-semibold">Recent Purchases</h4>
          <ul className="mt-2 text-sm text-slate-600">
            {useAppStore.getState().purchases.slice(0,8).map(px => (
              <li key={px.id} className="py-2 border-t border-slate-100">{px.title} — Rs. {px.price} — Buyer: {px.buyer}</li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <h4 className="font-semibold">List an Item for Sale</h4>
          <form onSubmit={submit} className="mt-3 space-y-3">
            <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <input placeholder="Seller (unit)" value={form.seller} onChange={e => setForm({ ...form, seller: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-2xl border border-slate-200" />
            <div className="grid grid-cols-3 gap-2">
              <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="px-3 py-2 rounded-xl border border-slate-200" />
              <input type="number" placeholder="Qty" value={form.qty} onChange={e => setForm({ ...form, qty: Number(e.target.value) })} className="px-3 py-2 rounded-xl border border-slate-200" />
              <button className="px-3 py-2 rounded-xl bg-brand-600 text-white">List Item</button>
            </div>
          </form>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <h4 className="font-semibold">Categories</h4>
          <ul className="mt-2 text-sm text-slate-600">
            {categories.map(c => <li key={c} className="py-1">• {c}</li>)}
          </ul>
        </div>
      </aside>
    </div>
  )
}
JS
