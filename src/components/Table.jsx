import React from 'react'
export default function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((c, idx) => (
              <th key={idx} className="text-left px-4 py-3 font-semibold text-slate-600">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <tr key={rIdx} className="border-t border-slate-100 hover:bg-slate-50/50">
              {columns.map((c, cIdx) => (
                <td key={cIdx} className="px-4 py-3 text-slate-700">{c.cell ? c.cell(row) : row[c.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
