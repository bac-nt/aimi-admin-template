import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Locale } from '@/lib/i18n'

type SidebarType   = 'full' | 'mini'
type Direction     = 'ltr' | 'rtl'
type ContainerType = 'boxed' | 'full'
type CardStyle     = 'border' | 'shadow'

interface UIState {
  sidebarOpen:     boolean
  darkMode:        boolean
  themeColor:      string
  sidebarType:     SidebarType
  direction:       Direction
  containerType:   ContainerType
  cardStyle:       CardStyle
  compactMode:     boolean
  locale:          Locale

  setSidebar:      (open: boolean) => void
  toggleSidebar:   () => void
  toggleDark:      () => void
  setThemeColor:   (color: string) => void
  setSidebarType:  (type: SidebarType) => void
  setDirection:    (dir: Direction) => void
  setContainerType:(type: ContainerType) => void
  setCardStyle:    (style: CardStyle) => void
  setCompactMode:  (v: boolean) => void
  setLocale:       (locale: Locale) => void
  resetSettings:   () => void
}

const DEFAULTS = {
  sidebarOpen:   true,
  darkMode:      false,
  themeColor:    '#5d87ff',
  sidebarType:   'full' as SidebarType,
  direction:     'ltr' as Direction,
  containerType: 'full' as ContainerType,
  cardStyle:     'shadow' as CardStyle,
  compactMode:   false,
  locale:        'en' as Locale,
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setSidebar:       (open)   => set({ sidebarOpen: open }),
      // FIX: toggleSidebar uses functional update to always read latest state
      toggleSidebar:    ()       => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      toggleDark:       ()       => set((s) => ({ darkMode: !s.darkMode })),
      setThemeColor:    (color)  => set({ themeColor: color }),
      setSidebarType:   (type)   => set({ sidebarType: type }),
      setDirection:     (dir)    => set({ direction: dir }),
      setContainerType: (type)   => set({ containerType: type }),
      setCardStyle:     (style)  => set({ cardStyle: style }),
      setCompactMode:   (v)      => set({ compactMode: v }),
      setLocale:        (locale) => set({ locale }),
      resetSettings:    ()       => set({ ...DEFAULTS }),
    }),
    {
      name: 'modernize-ui-v2',   // bump name to clear stale cache
      partialize: (s) => ({
        darkMode:      s.darkMode,
        themeColor:    s.themeColor,
        sidebarType:   s.sidebarType,
        direction:     s.direction,
        containerType: s.containerType,
        cardStyle:     s.cardStyle,
        compactMode:   s.compactMode,
        locale:        s.locale,
        sidebarOpen:   s.sidebarOpen,
      }),
    }
  )
)
