import { create } from "zustand"
import { AlgStore, defaultState } from "./types"

const useAlgorithmStore = create<AlgStore>((set, get) => ({
  ...defaultState,
  actions: {
    clearState: () => set(defaultState),

    setName: (name) => {
      if (name !== get().name) {
        set({ name })
      }
    },
    setData: (data) => {
      if (data !== get().data) {
        set({ data })
      }
    },
    setResult: (algResultados) => {
      if (algResultados !== get().algResultados) {
        set({ algResultados: algResultados })
      }
    },
  },
}))

export default useAlgorithmStore
