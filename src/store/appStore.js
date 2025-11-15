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

const marketplaceCategories = [
  'Furniture',
  'Electronics',
  'Home Appliances',
  'Vehicles',
  'Services',
  'Books & Learning',
  'Sports & Fitness',
  'Miscellaneous'
]

const initialMarketplaceItems = [
  {
    id: 501,
    title: '4-Seater Teak Dining Set',
    category: 'Furniture',
    price: 8500,
    condition: 'Good',
    description: 'Solid teak dining table with 4 cushioned chairs. Minor scratches, perfect for medium-sized dining rooms.',
    contact: 'Vikram (A-302) · 98765 43210',
    status: 'Available',
    createdAt: '2025-11-06T10:15:00.000Z'
  },
  {
    id: 502,
    title: 'Mi 50" 4K Smart TV',
    category: 'Electronics',
    price: 22000,
    condition: 'Like New',
    description: 'Purchased in Aug 2024. Includes original box, voice remote, and wall mount kit. Reason for selling: upgrading.',
    contact: 'Meera (B-110) · 98765 40123',
    status: 'Available',
    createdAt: '2025-11-09T18:40:00.000Z'
  },
  {
    id: 503,
    title: 'Weekend Yoga Sessions',
    category: 'Services',
    price: 1200,
    condition: 'Service',
    description: 'Certified yoga instructor conducting Saturday & Sunday morning sessions on the clubhouse terrace. 6 students per batch.',
    contact: 'Arun (C-507) · 98765 12222',
    status: 'Sold',
    createdAt: '2025-10-28T05:45:00.000Z',
    soldAt: '2025-11-08T07:30:00.000Z'
  }
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
  ],

  marketplaceCategories,
  marketplaceItems: initialMarketplaceItems,
  addMarketplaceItem: (item) => set(s => ({
    marketplaceItems: [
      {
        id: Date.now(),
        status: 'Available',
        createdAt: new Date().toISOString(),
        ...item
      },
      ...s.marketplaceItems
    ]
  })),
  markMarketplaceItemSold: (id) => set(s => ({
    marketplaceItems: s.marketplaceItems.map(entry => entry.id === id
      ? { ...entry, status: 'Sold', soldAt: new Date().toISOString() }
      : entry)
  }))
}))