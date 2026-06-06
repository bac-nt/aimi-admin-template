'use client'
/**
 * Chart components using Recharts — zero SSR issues,
 * full React 19 + Next.js 15 compatibility.
 * All colors use CSS variables / CHART_COLORS constant.
 */
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  type TooltipProps,
} from 'recharts'
import { CHART_COLORS } from '@/config/tokens'
import { cn } from '@/lib/utils'

/* ── Shared tooltip style ─────────────────────── */
const TOOLTIP_STYLE = {
  contentStyle: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--foreground)', fontSize: 12, boxShadow: 'var(--shadow-dropdown)' },
  labelStyle:   { color: 'var(--muted)', fontWeight: 600, marginBottom: 4 },
  itemStyle:    { color: 'var(--foreground)' },
}

const AXIS_STYLE = { tick: { fill: 'var(--muted)', fontSize: 11 }, axisLine: { stroke: 'transparent' }, tickLine: { stroke: 'transparent' } }
const GRID_STYLE = { stroke: 'var(--border)', strokeDasharray: '4 4' }

/* ── Types ─────────────────────────────────────── */
export interface ChartSeries { name: string; data: number[] }

interface BaseChartProps {
  series:     ChartSeries[]
  categories: string[]
  height?:    number
  colors?:    string[]
  className?: string
}

/* ── Area Chart ─────────────────────────────────── */
export function AreaChartWidget({ series, categories, height = 280, colors = CHART_COLORS as unknown as string[], className }: BaseChartProps) {
  const data = categories.map((cat, i) => {
    const point: Record<string, unknown> = { name: cat }
    series.forEach(s => { point[s.name] = s.data[i] ?? 0 })
    return point
  })
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="name" {...AXIS_STYLE} />
          <YAxis {...AXIS_STYLE} />
          <Tooltip {...TOOLTIP_STYLE} />
          {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12, color: 'var(--muted)' }} />}
          {series.map((s, i) => (
            <Area key={s.name} type="monotone" dataKey={s.name} stroke={colors[i % colors.length]} fill={colors[i % colors.length]} fillOpacity={0.12} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ── Bar Chart ──────────────────────────────────── */
export function BarChartWidget({ series, categories, height = 280, colors = CHART_COLORS as unknown as string[], className, stacked }: BaseChartProps & { stacked?: boolean }) {
  const data = categories.map((cat, i) => {
    const point: Record<string, unknown> = { name: cat }
    series.forEach(s => { point[s.name] = s.data[i] ?? 0 })
    return point
  })
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }} barCategoryGap="35%">
          <CartesianGrid {...GRID_STYLE} vertical={false} />
          <XAxis dataKey="name" {...AXIS_STYLE} />
          <YAxis {...AXIS_STYLE} />
          <Tooltip {...TOOLTIP_STYLE} cursor={{ fill: 'var(--primary-light)', opacity: 0.5 }} />
          {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12, color: 'var(--muted)' }} />}
          {series.map((s, i) => (
            <Bar key={s.name} dataKey={s.name} fill={colors[i % colors.length]} stackId={stacked ? 'a' : undefined} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ── Line Chart ─────────────────────────────────── */
export function LineChartWidget({ series, categories, height = 280, colors = CHART_COLORS as unknown as string[], className, dashed }: BaseChartProps & { dashed?: boolean }) {
  const data = categories.map((cat, i) => {
    const point: Record<string, unknown> = { name: cat }
    series.forEach(s => { point[s.name] = s.data[i] ?? 0 })
    return point
  })
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="name" {...AXIS_STYLE} />
          <YAxis {...AXIS_STYLE} />
          <Tooltip {...TOOLTIP_STYLE} />
          {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12, color: 'var(--muted)' }} />}
          {series.map((s, i) => (
            <Line key={s.name} type="monotone" dataKey={s.name} stroke={colors[i % colors.length]} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} strokeDasharray={dashed ? '6 3' : undefined} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ── Donut / Pie Chart ──────────────────────────── */
interface DonutChartProps {
  data:       { name: string; value: number }[]
  height?:    number
  colors?:    string[]
  innerLabel?: string
  className?: string
}

export function DonutChart({ data, height = 240, colors = CHART_COLORS as unknown as string[], innerLabel, className }: DonutChartProps) {
  const total = data.reduce((a, d) => a + d.value, 0)
  return (
    <div className={cn('relative', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" paddingAngle={2} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
          </Pie>
          <Tooltip {...TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: 12, color: 'var(--muted)' }} />
        </PieChart>
      </ResponsiveContainer>
      {innerLabel && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center" style={{ marginTop: '-24px' }}>
            <p className="text-xl font-black" style={{ color: 'var(--foreground)' }}>{innerLabel}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Sparkline (mini chart, no axes) ────────────── */
interface SparklineProps { data: number[]; color: string; height?: number; type?: 'area' | 'bar' }

export function Sparkline({ data, color, height = 50, type = 'area' }: SparklineProps) {
  const d = data.map((v, i) => ({ i, v }))
  return (
    <ResponsiveContainer width="100%" height={height}>
      {type === 'bar' ? (
        <BarChart data={d} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barCategoryGap="20%">
          <Bar dataKey="v" fill={color} radius={[2, 2, 0, 0]} />
        </BarChart>
      ) : (
        <AreaChart data={d} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`sp-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} fill={`url(#sp-${color.replace('#','')})`} strokeWidth={2} dot={false} />
        </AreaChart>
      )}
    </ResponsiveContainer>
  )
}
