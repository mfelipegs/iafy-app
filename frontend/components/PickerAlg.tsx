import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { nomeAlg } from "@/zustand/types"

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: "#f0f0f0",
    marginBottom: 16,
  },
})

type PickerProps = {
  label: string
  selectedValue: nomeAlg
  onValueChange: (value: nomeAlg) => void
}

const PickerAlg: React.FC<PickerProps> = ({ label, selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={styles.picker}>
        <Picker.Item label="Algoritmo Genético" value="genetic_algorithm" />
        <Picker.Item label="Árvore de Decisão" value="decision_tree" />
        <Picker.Item label="K-ésimo Vizinho mais Próximo (KNN)" value="knn" />
      </Picker>
    </View>
  )
}

export default PickerAlg
