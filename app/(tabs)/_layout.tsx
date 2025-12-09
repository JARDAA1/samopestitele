import { Tabs } from "expo-router";
import { useCart } from "../utils/cartContext";
import { Text, View } from "react-native";

function CartBadge() {
  const { cart } = useCart();
  
  if (cart.length === 0) return <Text>🛒</Text>;
  
  return (
    <View style={{ position: 'relative' }}>
      <Text>🛒</Text>
      <View style={{
        position: 'absolute',
        top: -5,
        right: -8,
        backgroundColor: '#FF5252',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
      }}>
        <Text style={{ 
          color: 'white', 
          fontSize: 11, 
          fontWeight: 'bold' 
        }}>
          {cart.length}
        </Text>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{ 
          title: "Domů",
          tabBarIcon: () => <Text>🏠</Text>
        }}
      />

      <Tabs.Screen
        name="pestitele"
        options={{ 
          title: "Pěstitelé",
          tabBarIcon: () => <Text>🌱</Text>
        }}
      />

      <Tabs.Screen
        name="mapa"
        options={{ 
          title: "Mapa",
          tabBarIcon: () => <Text>🗺️</Text>
        }}
      />

      <Tabs.Screen
        name="kosik"
        options={{ 
          title: "Košík",
          tabBarIcon: () => <CartBadge />
        }}
      />

      <Tabs.Screen
        name="registrace"
        options={{ 
          title: "Registrace",
          tabBarIcon: () => <Text>➕</Text>
        }}
      />
    </Tabs>
  );
}
