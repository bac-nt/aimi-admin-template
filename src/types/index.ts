// ─── Chat ──────────────────────────────────────────────────────
export interface ChatContact {
  id:      number
  name:    string
  role:    string
  status:  'online' | 'away' | 'offline'
  avatar:  string
  unread:  number
  lastMsg: string
  time:    string
}
export interface ChatMessage {
  id:     number
  from:   string
  avatar: string
  text:   string
  time:   string
  self:   boolean
  read:   boolean
}

// ─── Email ─────────────────────────────────────────────────────
export interface EmailMessage {
  id:            number
  from:          string
  email:         string
  subject:       string
  preview:       string
  date:          string
  read:          boolean
  starred:       boolean
  folder:        string
  avatar:        string
  hasAttachment: boolean
  labels:        string[]
}

// ─── Ticket ────────────────────────────────────────────────────
export interface Ticket {
  id:       string
  subject:  string
  customer: string
  email:    string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  status:   'open' | 'in-progress' | 'resolved' | 'closed'
  category: string
  created:  string
  updated:  string
  assignee: string
  messages: number
}

// ─── Invoice ───────────────────────────────────────────────────
export interface InvoiceItem {
  name:  string
  qty:   number
  price: number
}
export interface Invoice {
  id:       string
  client:   string   // alias for customer - used by some pages
  customer: string
  email:    string
  items:    InvoiceItem[]
  subtotal: number
  tax:      number
  total:    number
  status:   'Paid' | 'Pending' | 'Overdue' | 'Draft'
  date:     string
  due:      string
}

// ─── Calendar ──────────────────────────────────────────────────
export interface CalendarEvent {
  id:        number
  title:     string
  start:     string
  end:       string
  color:     string
  type:      'meeting' | 'event' | 'task' | 'personal'
  desc:      string
  recurring: boolean
}

// ─── Notes ─────────────────────────────────────────────────────
export interface Note {
  id:      number
  title:   string
  content: string
  color:   string
  pinned:  boolean
  tags:    string[]
  date:    string
}

// ─── Kanban ────────────────────────────────────────────────────
export interface KanbanItem {
  id:       string
  title:    string
  priority: 'high' | 'medium' | 'low'
  assignee: string
  tags:     string[]
  desc:     string
}
export interface KanbanColumn {
  id:    string
  title: string
  color: string
  items: KanbanItem[]
}

// ─── Contact ───────────────────────────────────────────────────
export interface Contact {
  id:      number
  name:    string
  email:   string
  phone:   string
  company: string
  role:    string
  city:    string
  country: string
  avatar:  string
  status:  'active' | 'inactive'
  tags:    string[]
}

// ─── Orders / Products ─────────────────────────────────────────
export interface Order {
  id:       string
  customer: string
  email:    string
  items:    number
  total:    number
  status:   'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  date:     string
  payment:  string
  city:     string
}
export interface Product {
  id:       number
  name:     string
  category: string
  brand:    string
  sku:      string
  price:    number
  original: number
  stock:    number
  status:   'Active' | 'Inactive'
  rating:   number
  reviews:  number
  img:      string
  image:    string
}

// ─── Shared ────────────────────────────────────────────────────
export type StatusVariant = 'success' | 'warning' | 'error' | 'primary' | 'secondary' | 'muted' | 'purple' | 'outline'
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'outline'
export interface SelectOption { value: string; label: string }
export interface Breadcrumb   { label: string; href?: string }
export interface NavChild     { label: string; href: string }
