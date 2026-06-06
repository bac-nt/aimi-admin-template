export const COLOR = {
  primary:        '#5d87ff',
  primaryLight:   '#ecf2ff',
  secondary:      '#49beff',
  secondaryLight: '#e8f7ff',
  success:        '#13deb9',
  successLight:   '#e6fffa',
  warning:        '#ffae1f',
  warningLight:   '#fef5e5',
  error:          '#fa896b',
  errorLight:     '#fef0eb',
  purple:         '#7c3aed',
  purpleLight:    '#f3ecff',
  muted:          '#7c8fac',
  border:         '#e5eaef',
  surface:        '#f5f6fa',
  card:           '#ffffff',
  foreground:     '#2a3547',
}

export const CHART_COLORS = [
  '#5d87ff', '#49beff', '#13deb9',
  '#ffae1f', '#fa896b', '#7c3aed',
  '#06b6d4', '#84cc16',
]

export function chartColor(i: number): string {
  return CHART_COLORS[i % CHART_COLORS.length]
}
