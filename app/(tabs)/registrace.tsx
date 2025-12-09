import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";

export default function RegistraceScreen() {
  const [formData, setFormData] = useState({
    nazev: "",
    jmeno: "",
    telefon: "",
    email: "",
    adresa: "",
    popis: "",
    produkty: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validace
    if (!formData.nazev || !formData.jmeno || !formData.telefon || !formData.email) {
      Alert.alert("Chyba", "Vyplňte prosím povinná pole (označená *)");
      return;
    }

    // Email validace
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Chyba", "Zadejte prosím platný email");
      return;
    }

    // Telefon validace
    const phoneRegex = /^[0-9\s+()-]{9,}$/;
    if (!phoneRegex.test(formData.telefon)) {
      Alert.alert("Chyba", "Zadejte prosím platné telefonní číslo");
      return;
    }

    // Simulace odeslání
    Alert.alert(
      "✅ Registrace odeslána!",
      `Děkujeme ${formData.jmeno}!\n\nVaše registrace byla úspěšně odeslána. Brzy vás budeme kontaktovat na ${formData.email}.\n\nTěšíme se na spolupráci! 🌱`,
      [
        {
          text: "OK",
          onPress: () => {
            // Vyčistit formulář
            setFormData({
              nazev: "",
              jmeno: "",
              telefon: "",
              email: "",
              adresa: "",
              popis: "",
              produkty: "",
            });
            // Vrátit na hlavní obrazovku
            router.push("/");
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🌱</Text>
          <Text style={styles.title}>Registrace pěstitele</Text>
          <Text style={styles.subtitle}>
            Chcete nabízet své produkty?{"\n"}Zaregistrujte se!
          </Text>
        </View>

        <View style={styles.form}>
          {/* Název farmy */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Název farmy / podniku *</Text>
            <TextInput
              style={styles.input}
              placeholder="např. Zelenina Pražská"
              value={formData.nazev}
              onChangeText={(text) => handleChange("nazev", text)}
            />
          </View>

          {/* Jméno kontaktní osoby */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vaše jméno *</Text>
            <TextInput
              style={styles.input}
              placeholder="Jan Novák"
              value={formData.jmeno}
              onChangeText={(text) => handleChange("jmeno", text)}
            />
          </View>

          {/* Telefon */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefon *</Text>
            <TextInput
              style={styles.input}
              placeholder="+420 123 456 789"
              value={formData.telefon}
              onChangeText={(text) => handleChange("telefon", text)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="vas@email.cz"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Adresa */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresa (volitelné)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ulice 123, Praha"
              value={formData.adresa}
              onChangeText={(text) => handleChange("adresa", text)}
            />
          </View>

          {/* Popis */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Popis vaší farmy (volitelné)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Pěstujeme bio zeleninu v Praze..."
              value={formData.popis}
              onChangeText={(text) => handleChange("popis", text)}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Produkty */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Co nabízíte? (volitelné)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Rajčata, okurky, papriky..."
              value={formData.produkty}
              onChangeText={(text) => handleChange("produkty", text)}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Info box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>
              Po odeslání vás budeme kontaktovat a pomůžeme vám nastavit váš profil včetně fotek a produktů.
            </Text>
          </View>

          {/* Tlačítka */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>📤 Odeslat registraci</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelBtnText}>Zrušit</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollView: {
    flex: 1,
  },

  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#f5f5f5",
  },

  headerEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2E7D32",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  form: {
    padding: 20,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },

  infoBox: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    alignItems: "flex-start",
  },

  infoIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#1976D2",
    lineHeight: 20,
  },

  submitBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  submitBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  cancelBtn: {
    paddingVertical: 14,
    alignItems: "center",
  },

  cancelBtnText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
});
