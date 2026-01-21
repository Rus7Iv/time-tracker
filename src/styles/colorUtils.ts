const clampChannel = (value: number) => Math.min(255, Math.max(0, value))

/**
 * Normalize #RGB/#RRGGBB to RRGGBB (without #).
 * @param input - A hex color string.
 * @returns The normalized 6-char hex string or null if not valid hex.
 */
const normalizeHex = (input: string) => {
  if (!input.startsWith('#')) return null
  const hex = input.slice(1)
  if (hex.length === 3) {
    return hex
      .split('')
      .map((char) => char + char)
      .join('')
  }
  if (hex.length === 6) return hex
  return null
}

/**
 * Lighten or darken a hex color by a relative amount.
 * @param hex - A hex color string (#RGB or #RRGGBB).
 * @param amount - Brightness delta in [-1, 1], where positive is lighter.
 * @returns A hex color string; returns the original input for non-hex values.
 */
export const adjustBrightness = (hex: string, amount: number) => {
  const normalized = normalizeHex(hex)
  if (!normalized) return hex
  const safeAmount = Math.max(-1, Math.min(1, amount))
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  const delta = 255 * safeAmount
  const next = [
    clampChannel(r + delta),
    clampChannel(g + delta),
    clampChannel(b + delta),
  ]
  return `#${next
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`
}

/**
 * Convert a hex color to rgba() with a given alpha.
 * @param hex - A hex color string (#RGB or #RRGGBB).
 * @param alpha - Alpha channel in [0, 1].
 * @returns An rgba() string; returns the original input for non-hex values.
 */
export const withAlpha = (hex: string, alpha: number) => {
  const normalized = normalizeHex(hex)
  if (!normalized) return hex
  const safeAlpha = Math.max(0, Math.min(1, alpha))
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`
}
