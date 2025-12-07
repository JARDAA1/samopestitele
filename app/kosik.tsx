import { View, Text, StyleSheet } from "react-native";
import { useCart } from "./context/CartContext";


export default function KosikScreen() {
  const { cart } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Košík</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Košík je prázdný</Text>
      ) : (
        cart.map((item, i) => (
          <Text key={i} style={styles.item}>
            {item.nazev} – {item.cena} Kč
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  empty: { fontSize: 18, color: "#666" },
  item: { fontSize: 18, marginBottom: 10 }
});
