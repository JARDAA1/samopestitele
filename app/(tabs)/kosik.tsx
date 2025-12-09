import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useCart } from "../utils/cartContext";

export default function KosikScreen() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.cena || 0), 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛒 Košík</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.empty}>Košík je prázdný</Text>
          <Text style={styles.emptySubtitle}>
            Přidejte produkty od pěstitelů
          </Text>
        </View>
      ) : (
        <>
          {cart.map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.nazev}</Text>
                <Text style={styles.itemPrice}>{item.cena} Kč</Text>
                <Text style={styles.itemPestitel}>
                  od: {item.pestitelName}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removeFromCart(i)}
                style={styles.removeBtn}
              >
                <Text style={styles.removeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Celkem:</Text>
            <Text style={styles.totalPrice}>{total} Kč</Text>
          </View>

          <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
            <Text style={styles.clearBtnText}>Vyprázdnit košík</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.orderBtn}>
            <Text style={styles.orderBtnText}>Objednat ({total} Kč)</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: "#fff" 
  },

  title: { 
    fontSize: 32, 
    fontWeight: "bold", 
    marginBottom: 20 
  },

  // Prázdný košík
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
    opacity: 0.3,
  },
  empty: { 
    fontSize: 22, 
    color: "#666", 
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  
  // Položky v košíku
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  itemInfo: { flex: 1 },
  itemName: { 
    fontSize: 18, 
    fontWeight: "700" 
  },
  itemPrice: { 
    fontSize: 17, 
    color: "#4CAF50", 
    fontWeight: "600",
    marginTop: 4 
  },
  itemPestitel: { 
    fontSize: 14, 
    color: "#999", 
    marginTop: 4 
  },
  
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f44336",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  removeBtnText: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  
  // Celková cena
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 2,
    borderColor: "#333",
  },
  totalLabel: { 
    fontSize: 24, 
    fontWeight: "bold" 
  },
  totalPrice: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#4CAF50" 
  },

  // Vyprázdnit košík
  clearBtn: {
    marginTop: 12,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: "#f44336",
    borderRadius: 12,
    alignItems: "center",
  },
  clearBtnText: { 
    color: "#f44336", 
    fontSize: 16, 
    fontWeight: "700" 
  },
  
  // Objednat
  orderBtn: {
    marginTop: 16,
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  orderBtnText: { 
    color: "white", 
    fontSize: 19, 
    fontWeight: "bold" 
  },
});
