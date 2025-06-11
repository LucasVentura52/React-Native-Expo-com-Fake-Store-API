import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#bfdbfe",
          },
          headerTitleStyle: {
            color: "#1e3a8a",
            fontSize: 20,
            fontWeight: "700",
          },
          headerTintColor: "#2563eb",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="products/index"
          options={{
            title: "Produtos",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/favorites")}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="heart-outline" size={24} color="#2563eb" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="favorites/index" options={{ title: "Favoritos" }} />
        <Stack.Screen name="products/[id]" options={{ title: "Detalhes" }} />
        <Stack.Screen name="+not-found" options={{ title: "Ops!" }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}