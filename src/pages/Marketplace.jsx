import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useAppStore } from '../store/appStore'
import Badge from '../components/Badge'

const conditionOptions = ['Brand New', 'Like New', 'Gently Used', 'Well Loved', 'Service']

const formatCurrency = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
}).format(value)

const formatDate = (isoString) => {
  if (!isoString) return '—'
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export default function Marketplace() {
  const categories = useAppStore(s => s.marketplaceCategories)
  const items = useAppStore(s => s.marketplaceItems)
  const addItem = useAppStore(s => s.addMarketplaceItem)
  const markSold = useAppStore(s => s.markMarketplaceItemSold)

  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    condition: 'Like New',
    description: '',
    contact: ''
  })
  const [filter, setFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('available')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!form.category && categories.length > 0) {
      setForm((prev) => ({ ...prev, category: categories[0] }))
    }
  }, [categories, form.category])

  const orderedItems = useMemo(() => {
    const clone = [...items]
    return clone.sort((a, b) => {
      if (a.status === b.status) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return a.status === 'Available' ? -1 : 1
    })
  }, [items])

  const filteredItems = useMemo(() => {
    return orderedItems.filter((item) => {
      const matchCategory = filter === 'all' || item.category === filter
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'available' && item.status === 'Available') ||
        (statusFilter === 'sold' && item.status === 'Sold')
      return matchCategory && matchStatus
    })
  }, [orderedItems, filter, statusFilter])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm({
      title: '',
      category: categories[0] || '',
      price: '',
      condition: 'Like New',
      description: '',
      contact: ''
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError(null)

    const trimmedTitle = form.title.trim()
    const trimmedDescription = form.description.trim()
    const trimmedContact = form.contact.trim()
    const priceValue = Number(form.price)

    if (!trimmedTitle) {
      setError('Please provide a title for the listing.')
      return
    }
    if (!form.category) {
      setError('Please choose a category.')
      return
    }
    if (form.price === '') {
      setError('Please enter a price for the listing.')
      return
    }
    if (Number.isNaN(priceValue) || priceValue < 0) {
      setError('Please enter a valid price (₹).')
      return
    }
    if (!trimmedContact) {
      setError('Please share how interested buyers can reach you.')
      return
    }

    addItem({
      title: trimmedTitle,
      category: form.category,
      price: priceValue,
      condition: form.condition,
      description: trimmedDescription,
      contact: trimmedContact
    })

    resetForm()
    setMessage('Your listing has been published to the community marketplace.')
    setTimeout(() => setMessage(null), 4000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 to-white border border-brand-100 rounded-3xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">Community Marketplace</div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-2">Buy, Sell & Share within Society Gate</h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              List pre-loved items, offer community services, or find a great bargain. Every listing stays within trusted residents.
            </p>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-white px-6 py-4 text-sm text-slate-600 shadow-soft">
            <div className="font-semibold text-brand-600">Marketplace Snapshot</div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span>Active listings</span>
                <span className="font-semibold text-slate-800">
                  {items.filter(item => item.status === 'Available').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Categories</span>
                <span className="font-semibold text-slate-800">{categories.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <section className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Create a Listing</h2>
            <Badge>{statusFilter === 'available' ? 'Available' : 'All'}</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Fill in the details below to publish your item or service to fellow residents.
          </p>
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="title">Listing Title</label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Eg. Premium office chair, barely used"
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-400"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="price">Price (₹)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="100"
                  value={form.price}
                  onChange={handleInputChange}
                  placeholder="Eg. 3500"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="condition">Condition</label>
              <select
                id="condition"
                name="condition"
                value={form.condition}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                {conditionOptions.map((condition) => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleInputChange}
                placeholder="Highlight key features, usage history, or add-ons included."
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="contact">Contact Details</label>
              <input
                id="contact"
                name="contact"
                value={form.contact}
                onChange={handleInputChange}
                placeholder="Eg. Ramesh (A-808) · 98765 00000"
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-400"
                required
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {message && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-white"
            >
              Publish Listing
            </button>
          </form>
        </section>

        <section className="xl:col-span-3">
          <div className="bg-white border border-slate-200 rounded-3xl px-5 py-4 flex flex-wrap items-center gap-4 shadow-soft">
            <div className="text-sm font-medium text-slate-700">Browse marketplace</div>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Status:</span>
              <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setStatusFilter('available')}
                  className={clsx(
                    'px-3 py-1 rounded-full transition-colors',
                    statusFilter === 'available' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500'
                  )}
                >
                  Available
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('sold')}
                  className={clsx(
                    'px-3 py-1 rounded-full transition-colors',
                    statusFilter === 'sold' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500'
                  )}
                >
                  Sold
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className={clsx(
                    'px-3 py-1 rounded-full transition-colors',
                    statusFilter === 'all' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500'
                  )}
                >
                  All
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredItems.length === 0 && (
              <div className="col-span-full rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                No listings match the selected filters right now. Try adjusting the filters or create a new listing.
              </div>
            )}

            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
              >
                {item.status === 'Sold' && (
                  <div className="absolute inset-0 rounded-3xl bg-slate-900/5 backdrop-blur-sm pointer-events-none" />
                )}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge>{item.category}</Badge>
                      <Badge>{item.condition}</Badge>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wide text-slate-400">Listed on</div>
                    <div className="text-sm font-medium text-slate-600">{formatDate(item.createdAt)}</div>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  {item.description || 'No description provided.'}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-slate-400">Price</div>
                    <div className="text-xl font-semibold text-brand-600">{formatCurrency(item.price)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wide text-slate-400">Contact</div>
                    <div className="text-sm font-medium text-slate-700">{item.contact}</div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <Badge>{item.status}</Badge>
                  {item.status === 'Available' ? (
                    <button
                      type="button"
                      onClick={() => markSold(item.id)}
                      className="rounded-full border border-brand-200 px-4 py-2 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50"
                    >
                      Mark as Sold
                    </button>
                  ) : (
                    <div className="text-xs text-slate-400">
                      Sold on {formatDate(item.soldAt)}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}