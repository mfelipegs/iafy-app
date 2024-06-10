import { DocumentPickerAsset } from "expo-document-picker"

export interface ResultadosAlg {
  name: string
  image?: string
  accuracy?: number
  algorithm?: number[]
  individual?: string
}

export interface responseAlg {
  document: DocumentPickerAsset
  rangeMin: number
  rangeMax: number
  generations: number
  childrenSize: number
  mutationRate: number
  populationSize: number
}

export type nomeAlg = "knn" | "decision_tree" | "genetic_algorithm"

export interface AlgZustand {
  name: nomeAlg
  data?: Partial<responseAlg>
  algResultados?: ResultadosAlg
}

export interface AlgorithmStoreActions {
  clearState: () => void
  setName: (name: nomeAlg) => void
  setData: (data: Partial<responseAlg>) => void
  setResult: (result: ResultadosAlg) => void
}

export type AlgStore = AlgZustand & {
  actions: AlgorithmStoreActions
}

export const defaultState: AlgZustand = {
  name: "knn",
  data: undefined,
  algResultados: undefined,
}
