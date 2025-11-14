cat > src/components/ProductCard.jsx <<'JS'
import React from 'react'
import Badge from './Badge'

export default function ProductCard({ product, onBuy }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 flex gap-4 items-start">
      <div className="h-24 w-24 rounded-lg bg-slate-100 grid place-items-center text-slate-400 font-semibold">
        {product.category}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-semibold text-slate-800">{product.title}</div>
            <div className="text-xs text-slate-500">{product.description}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-slate-800">Rs. {product.price}</div>
            <div className="text-xs text-slate-400">{product.seller}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge>{product.qty > 0 ? `${product.qty} left` : 'Sold out'}</Badge>
            <div className="text-xs text-slate-500">Posted: {product.createdAt}</div>
          </div>
          <div>
            <button onClick={onBuy} disabled={product.qty <= 0}
              className={`px-3 py-2 rounded-xl ${product.qty > 0 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
JS
