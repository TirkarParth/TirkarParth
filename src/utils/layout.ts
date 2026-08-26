/** Distance from the viewport top that keeps pinned content clear of the floating nav. */
export function getHeaderClearance(extra = 24): number {
  const header = document.querySelector<HTMLElement>('header')
  if (!header) return 152
  return Math.ceil(header.getBoundingClientRect().bottom + extra)
}

export function applyHeaderClearance(extra = 24): number {
  const clearance = getHeaderClearance(extra)
  document.documentElement.style.setProperty('--header-clearance', `${clearance}px`)
  return clearance
}
