import React from "react"
import { Text, TextInput, View, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    marginBottom: 16,
  },
})

interface NumericInputProps {
  label: string
  value: number | undefined
  onChangeText: (text: string) => void
}

const NumericInput: React.FC<NumericInputProps> = ({ label, value, onChangeText }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={value ? value.toString() : ""}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default NumericInput
