import React, { useState } from "react"

import { DocumentPickerAsset, getDocumentAsync } from "expo-document-picker"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import { makeRequest } from "@/services/useRequest"
import { nomeAlg, responseAlg } from "@/zustand/types"

import { View, Button, ScrollView, StyleSheet, Text } from "react-native"
import PickerAlg from "@/components/PickerAlg"
import NumericInput from "@/components/NumericInput"

const stylesIndex = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 48,
  },

  textLabel: {
    marginBottom: 12,
    fontSize: 16,
    color: "gray",
  },
})

type objDados = Partial<responseAlg> | undefined

export default function HomeScreen() {
  const router = useRouter()
  const algorithmFn = makeRequest()

  const [taxaMut, setTaxaMut] = useState(1)

  const [algoritmoEscolhido, setAlgoritmoEscolhido] = useState<nomeAlg>("knn")

  const [dados, setDados] = useState<objDados>(undefined)

  const [dataset, setDataset] = useState<DocumentPickerAsset | null>(null)

  const uploadBlob = async () => {
    const document = await getDocumentAsync({
      multiple: false,
      type: ["text/csv", "text/data", "text/comma-separated-values"],
    })

    if (!document.canceled) {
      setDataset(document.assets[0])
      setDados({ ...dados, document: document.assets[0] })
    }
  }

  const handleRunAlg = () => {
    if (!dados || (!dataset && algoritmoEscolhido !== "genetic_algorithm")) {
      throw new Error("Erro: Nenhum dataset encontrado.")
    }

    algorithmFn.mutate(
      { name: algoritmoEscolhido, data: dados },
      {
        onSuccess: () => router.push("pages/response-alg"),
      }
    )
  }

  return (
    <SafeAreaView style={stylesIndex.container}>
      <ScrollView>
        <PickerAlg
          label="Escolha um algoritmo"
          selectedValue={algoritmoEscolhido}
          onValueChange={setAlgoritmoEscolhido}
        />

        {algoritmoEscolhido === "genetic_algorithm" ? (
          <View>
            <NumericInput
              label="Mutação"
              value={taxaMut}
              onChangeText={(text) => setTaxaMut(Number(text))}
            />
            <NumericInput
              label="Tamanho da população"
              value={dados?.populationSize}
              onChangeText={(text) => setDados({ ...dados, populationSize: Number(text) })}
            />
            <NumericInput
              label="Número de gerações"
              value={dados?.generations}
              onChangeText={(text) => setDados({ ...dados, generations: Number(text) })}
            />
            <NumericInput
              label="Filhos"
              value={dados?.childrenSize}
              onChangeText={(text) => setDados({ ...dados, childrenSize: Number(text) })}
            />
            <NumericInput
              label="Menor valor"
              value={dados?.rangeMin}
              onChangeText={(text) => setDados({ ...dados, rangeMin: Number(text) })}
            />
            <NumericInput
              label="Maior valor"
              value={dados?.rangeMax}
              onChangeText={(text) => setDados({ ...dados, rangeMax: Number(text) })}
            />
          </View>
        ) : (
          <View>
            <Text style={stylesIndex.textLabel}>Faça o upload de um dataset</Text>
            <Button onPress={uploadBlob} title={"Escolher dataset"} color="gray" />
          </View>
        )}

        <Button onPress={handleRunAlg} title="Rodar" color="green" />
      </ScrollView>
    </SafeAreaView>
  )
}
