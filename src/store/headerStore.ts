import { create } from 'zustand'

interface HeaderState {
  isExpanded: boolean
  toggleHeader: () => void
}

const useHeaderStore = create<HeaderState>((set) => ({
  isExpanded: false,
  toggleHeader: () =>
    set((state) => ({
      isExpanded: !state.isExpanded,
    })),
}))

export default useHeaderStore
