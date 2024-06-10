import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import useAlgorithmStore from "@/zustand/algorithm"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 36,
    padding: 26,
  },

  title: {
    fontSize: 28,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    marginTop: 10,
  },

  label: {
    fontSize: 18,
    marginBottom: 10,
  },
})

export default function ResultScreen() {
  const router = useRouter()
  const { name, algResultados: algResultados } = useAlgorithmStore()

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Resultados do Algoritmo</Text>
          {name === "decision_tree" || name === "knn" ? (
            <>
              <Text>A acurácia obtida foi de {algResultados?.accuracy}</Text>
            </>
          ) : (
            <>
              <Text>Melhor indivíduo</Text>
              <Text>x1 {algResultados?.individual?.[0]}</Text>
              <Text>x2 {algResultados?.individual?.[1]}</Text>
              <Text>Fitness {algResultados?.individual?.[2]}</Text>
            </>
          )}
          {algResultados?.image && (
            <Image
              source={{
                uri: algResultados.image,
              }}
            />
          )}
        </View>
        <Button onPress={() => router.push("/")} title="Voltar para home" />
      </ScrollView>
    </SafeAreaView>
  )
}
