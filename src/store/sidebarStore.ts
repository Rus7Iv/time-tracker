import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isExpanded: boolean
  toggleSidebar: () => void
}

const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isExpanded: false,
      toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
    }),
    {
      name: 'sidebar-storage',
    },
  ),
)

export default useSidebarStore
