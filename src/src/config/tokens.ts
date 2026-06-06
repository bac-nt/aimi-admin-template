/** Design token constants - mirrors CSS variables for use in JS */
export const COLOR = {
  primary:   '#5d87ff',
  secondary: '#49beff',
  success:   '#13deb9',
  warning:   '#ffae1f',
  error:     '#fa896b',
  purple:    '#7c3aed',
  muted:     '#7c8fac',
} as const

/** Chart color palette - used by recharts components */
export const CHART_COLORS = [
  '#5d87ff',  // primary blue
  '#49beff',  // secondary cyan
  '#13deb9',  // success teal
  '#ffae1f',  // warning amber
  '#fa896b',  // error coral
  '#7c3aed',  // purple
  '#2dd4bf',  // teal
  '#f472b6',  // pink
  '#a78bfa',  // violet
  '#34d399',  // emerald
] as const

/** Single chart color by index (safe accessor) */
export function chartColor(index: number): string {
  return CHART_COLORS[index % CHART_COLORS.length]
}
