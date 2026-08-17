import { useEffect, useState } from 'react'
import { navLinks, siteConfig } from '@/data/content'
import { scrollToId } from '@/hooks/useSmoothScroll'
import { useAppStore } from '@/store/useAppStore'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const setCursor = useAppStore((s) => s.setCursor)
  const isLoading = useAppStore((s) => s.isLoading)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (href: string) => {
    setOpen(false)
    scrollToId(href)
  }

  if (isLoading) return null

  return (
    <>
      <header
        className={`fixed left-1/2 top-5 z-40 -translate-x-1/2 transition-all duration-500 ease-out-expo ${
          scrolled ? 'w-[min(960px,calc(100%-1.75rem))]' : 'w-[min(1120px,calc(100%-1.75rem))]'
        }`}
      >
        <nav
          className={`glass-nav flex items-center justify-between rounded-full px-5 md:px-8 transition-all duration-500 ${
            scrolled ? 'h-14 md:h-[4.25rem]' : 'h-16 md:h-[4.75rem]'
          }`}
          aria-label="Primary"
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNav('#hero')
            }}
            className="font-display text-lg md:text-xl font-medium tracking-tight py-1"
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={() => setCursor('default')}
            aria-label="Parth Tirkar — home"
          >
            PT
          </a>

          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.href)
                  }}
                  className="text-sm text-graphite-200 hover:text-white transition-colors duration-300 py-2"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={() => setCursor('default')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center rounded-full border border-accent/40 px-4 py-2 text-xs tracking-[0.18em] uppercase text-accent hover:bg-accent/10 hover:text-accent-soft transition-colors"
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={() => setCursor('default')}
          >
            Resume
          </a>

          <button
            type="button"
            className="md:hidden relative h-10 w-10 flex items-center justify-center"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-px w-5 bg-white transition-all duration-300 ${
                open ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-white transition-all duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-white transition-all duration-300 ${
                open ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-30 bg-graphite-950/95 backdrop-blur-xl transition-all duration-500 ease-out-expo md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-center px-8 gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleNav(link.href)
              }}
              className={`font-display text-display-md text-white transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 text-sm tracking-[0.2em] uppercase text-accent"
          >
            Download Resume
          </a>
        </div>
      </div>
    </>
  )
}
