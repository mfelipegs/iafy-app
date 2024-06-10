import "react-native-reanimated"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"

import QueryClientProvider from "../provider"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <QueryClientProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="pages/response-alg" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
