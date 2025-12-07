import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import pestitele from "../data/pestitele.json";

export default function PestiteleScreen() {
  const [search, setSearch] = useState("");

  const filtered = pestitele.filter((p) =>
    p.nazev.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Pěstitelé 🌱</Text>

      <TextInput
        style={styles.search}
        placeholder="Hledat pěstitele…"
        value={search}
        onChangeText={setSearch}
      />

      {filtered.map((p) => (
        <Link href={`/pestitele/${p.id}`} key={p.id} asChild>
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: p.foto }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{p.nazev}</Text>
              <Text style={styles.address}>{p.adresa}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 36, fontWeight: "bold", marginBottom: 15 },
  search: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 25,
    elevation: 3,
  },
  image: { width: "100%", height: 200 },
  info: { padding: 15 },
  name: { fontSize: 24, fontWeight: "600" },
  address: { fontSize: 16, color: "#555" },
});
