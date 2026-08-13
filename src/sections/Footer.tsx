import { siteConfig } from '@/data/content'
import { scrollToId } from '@/hooks/useSmoothScroll'
import { useAppStore } from '@/store/useAppStore'

export function Footer() {
  const setCursor = useAppStore((s) => s.setCursor)
  const year = new Date().getFullYear()

  return (
    <footer className="relative section-pad border-t border-white/10 py-12 md:py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <p className="font-display text-2xl md:text-3xl tracking-tight">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-graphite-400">Creative Developer</p>
          <p className="mt-6 text-xs text-graphite-500">© {year}</p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-graphite-300">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={() => setCursor('default')}
          >
            GitHub
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={() => setCursor('default')}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-white transition-colors"
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={() => setCursor('default')}
          >
            Email
          </a>
          <button
            type="button"
            onClick={() => scrollToId('#hero')}
            className="hover:text-accent transition-colors"
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={() => setCursor('default')}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
