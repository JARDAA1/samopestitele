import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Pozadí s realistickou trávou a ovocem/zeleninou */}
      <ImageBackground
        source={{
          uri: "https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20fresh%20organic%20vegetables%20and%20fruits%20on%20green%20grass%20lawn%2C%20including%20red%20tomatoes%2C%20orange%20bell%20peppers%2C%20green%20cucumbers%2C%20yellow%20pears%2C%20red%20strawberries%2C%20raspberries%2C%20white%20cauliflower%2C%20broccoli%2C%20sunny%20day%2C%20top%20view%2C%20vibrant%20colors%2C%20high%20quality%2C%204k?width=1080&height=1920&nologo=true&seed=123"
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Poloprohledná vrstva pro lepší čitelnost */}
        <View style={styles.overlay} />

        {/* Obsah nad pozadím */}
        <View style={styles.content}>
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

          {/* Registrace tlačítko */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Pro pěstitele</Text>
            <View style={styles.dividerLine} />
          </View>

          <Link href="/registrace" asChild>
            <TouchableOpacity style={styles.btnRegister}>
              <Text style={styles.btnRegisterText}>➕ Chci nabízet produkty</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Jemná bílá vrstva pro lepší čitelnost
  },

  content: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    zIndex: 1,
  },

  heroImage: {
    width: "90%",
    height: 240,
    borderRadius: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1B5E20",
    textShadowColor: "rgba(255, 255, 255, 0.9)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  subtitle: {
    fontSize: 18,
    color: "#2E7D32",
    marginBottom: 30,
    fontWeight: "600",
    textShadowColor: "rgba(255, 255, 255, 0.9)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  btn: {
    width: "75%",
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  btnSecondary: {
    width: "75%",
    borderWidth: 2,
    borderColor: "#4CAF50",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  btnText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },

  btnTextSecondary: {
    fontSize: 20,
    color: "#2E7D32",
    textAlign: "center",
    fontWeight: "700",
  },

  // Divider
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
    width: "75%",
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  dividerText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },

  // Registrace tlačítko
  btnRegister: {
    width: "75%",
    borderWidth: 2,
    borderColor: "#FF9800",
    backgroundColor: "rgba(255, 152, 0, 0.1)",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  btnRegisterText: {
    fontSize: 18,
    color: "#FF9800",
    textAlign: "center",
    fontWeight: "700",
  },
});
