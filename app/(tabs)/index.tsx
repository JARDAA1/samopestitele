import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* Hero obrázek koše */}
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/jaroslav-antos/assets/main/kos_ovoce_zelenina.jpg"
        }}
        style={styles.heroImage}
      />

      <Text style={styles.title}>Vítejte na tržišti</Text>
      <Text style={styles.subtitle}>Vyberte si sekci aplikace</Text>

      {/* Tlačítka */}
      <Link href="/pestitele" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Pěstitelé</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/mapa" asChild>
        <TouchableOpacity style={styles.btnSecondary}>
          <Text style={styles.btnTextSecondary}>Mapa trasy</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  heroImage: {
    width: "90%",
    height: 240,
    borderRadius: 20,
    marginBottom: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },

  btn: {
    width: "75%",
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  btnSecondary: {
    width: "75%",
    borderWidth: 2,
    borderColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 12,
  },

  btnText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },

  btnTextSecondary: {
    fontSize: 20,
    color: "#4CAF50",
    textAlign: "center",
  },
});
