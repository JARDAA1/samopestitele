import { Stack } from "expo-router";

export default function PestiteleLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerBackTitle: "Zpět",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Pěstitelé 🌱",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detail pěstitele",
        }}
      />
    </Stack>
  );
}
