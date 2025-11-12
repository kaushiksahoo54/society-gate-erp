import { create } from 'zustand'

const initialVisitors = [
  { id: 1, name: 'Ramesh Kumar', purpose: 'Delivery', flat: 'A-302', inTime: '10:15', outTime: null, vehicle: 'OD 02 AB 1234' },
  { id: 2, name: 'Anita Sharma', purpose: 'Guest', flat: 'B-110', inTime: '11:05', outTime: '13:40', vehicle: '—' },
  { id: 3, name: 'Plumber', purpose: 'Maintenance', flat: 'C-507', inTime: '12:20', outTime: null, vehicle: '—' }
]

const initialTickets = [
  { id: 201, title: 'Lift not working', status: 'Open', unit: 'B-204', priority: 'High', createdAt: '2025-11-01' },
  { id: 202, title: 'Water leakage in basement', status: 'In Progress', unit: 'Common', priority: 'Critical', createdAt: '2025-11-03' },
  { id: 203, title: 'Streetlight flickering', status: 'Resolved', unit: 'Perimeter', priority: 'Low', createdAt: '2025-11-08' }
]

const initialInvoices = [
  { id: 'INV-101', unit: 'A-302', month: 'Nov 2025', amount: 2850, status: 'Unpaid', dueDate: '2025-11-30' },
  { id: 'INV-102', unit: 'B-110', month: 'Nov 2025', amount: 3100, status: 'Paid', dueDate: '2025-11-07' },
  { id: 'INV-103', unit: 'C-507', month: 'Nov 2025', amount: 2600, status: 'Overdue', dueDate: '2025-11-05' }
]

export const useAppStore = create((set, get) => ({
  sidebarOpen: true,
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),

  visitors: initialVisitors,
  addVisitor: (v) => set(s => ({ visitors: [{ id: Date.now(), ...v }, ...s.visitors] })),
  checkoutVisitor: (id) => set(s => ({ visitors: s.visitors.map(v => v.id === id ? { ...v, outTime: new Date().toTimeString().slice(0,5) } : v) })),

  tickets: initialTickets,
  updateTicket: (id, patch) => set(s => ({ tickets: s.tickets.map(t => t.id === id ? { ...t, ...patch } : t) })),
  addTicket: (t) => set(s => ({ tickets: [{ id: Date.now(), ...t }, ...s.tickets] })),

  invoices: initialInvoices,
  addInvoice: (i) => set(s => ({ invoices: [{ id: `INV-${Date.now()}`, ...i }, ...s.invoices] })),

  announcements: [
    { id: 1, title: 'Diwali Celebration on Nov 12', body: 'Join us at the clubhouse 7 PM onwards.', date: '2025-11-10' },
    { id: 2, title: 'Pool closed for maintenance', body: 'Reopens on Nov 15.', date: '2025-11-09' }
  ],

  residents: [
    { id: 'A-302', owner: 'Vikram Rao', phone: '9876543210', vehicles: 1, members: 3, dues: 2850 },
    { id: 'B-110', owner: 'Meera Nair', phone: '9876501234', vehicles: 2, members: 2, dues: 0 },
    { id: 'C-507', owner: 'Arun Das', phone: '9876512222', vehicles: 1, members: 4, dues: 2600 }
  ],

  staff: [
    { id: 'G-01', name: 'Suresh', role: 'Guard', shift: 'Day', phone: '9990001111' },
    { id: 'G-02', name: 'Mahesh', role: 'Guard', shift: 'Night', phone: '9990002222' },
    { id: 'HK-11', name: 'Lata', role: 'Housekeeping', shift: 'Day', phone: '9990003333' }
  ]
}))
