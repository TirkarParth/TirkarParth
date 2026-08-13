import { create } from 'zustand'

type CursorState = 'default' | 'link' | 'view' | 'drag' | 'hidden'

interface AppState {
  isLoading: boolean
  loadProgress: number
  webglSupported: boolean
  reducedMotion: boolean
  isMobile: boolean
  cursor: CursorState
  activeProjectId: string | null
  scrollProgress: number
  setLoading: (v: boolean) => void
  setLoadProgress: (v: number) => void
  setWebglSupported: (v: boolean) => void
  setReducedMotion: (v: boolean) => void
  setIsMobile: (v: boolean) => void
  setCursor: (v: CursorState) => void
  setActiveProjectId: (id: string | null) => void
  setScrollProgress: (v: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  loadProgress: 0,
  webglSupported: true,
  reducedMotion: false,
  isMobile: false,
  cursor: 'default',
  activeProjectId: null,
  scrollProgress: 0,
  setLoading: (isLoading) => set({ isLoading }),
  setLoadProgress: (loadProgress) => set({ loadProgress }),
  setWebglSupported: (webglSupported) => set({ webglSupported }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setCursor: (cursor) => set({ cursor }),
  setActiveProjectId: (activeProjectId) => set({ activeProjectId }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
}))
