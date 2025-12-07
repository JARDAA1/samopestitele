// app/pestitele/[id].tsx

import { useLocalSearchParams } from "expo-router";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import pestitele from "../data/pestitele.json";

export default function PestitelDetail() {
  const { id } = useLocalSearchParams();

  // najdu pěstitele podle id z URL
  const pestitel = Array.isArray(pestitele)
    ? pestitele.find((p) => String(p.id) === String(id))
    : undefined;

  if (!pestitel) {
    return (
      <View style={styles.center}>
        <Text>Pěstitel nenalezen.</Text>
      </View>
    );
  }

  // bezpečné hodnocení – když není číslo, zobrazí pomlčku
  const ratingText =
    typeof pestitel.rating === "number"
      ? `⭐ ${pestitel.rating.toFixed(1)}`
      : "⭐ –";

  return (
    <ScrollView style={styles.container}>
      {/* FOTO */}
      {pestitel.foto && (
        <Image source={{ uri: pestitel.foto }} style={styles.headerImage} />
      )}

      {/* HLAVIČKA */}
      <Text style={styles.title}>{pestitel.nazev}</Text>
      <Text style={styles.address}>{pestitel.adresa}</Text>

      {/* NAVIGACE */}
      {pestitel.gps_lat && pestitel.gps_lng && (
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&destination=${pestitel.gps_lat},${pestitel.gps_lng}`
            )
          }
        >
          <Text style={styles.navBtnText}>Navigovat 🚗</Text>
        </TouchableOpacity>
      )}

      {/* PRODUKTY */}
      {Array.isArray(pestitel.produkty) && pestitel.produkty.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Produkty</Text>
          {pestitel.produkty.map((prod, index) => (
            <View key={index} style={styles.productRow}>
              <Text style={styles.productName}>{prod.nazev}</Text>
              {typeof prod.cena === "number" && (
                <Text style={styles.productPrice}>{prod.cena} Kč</Text>
              )}
            </View>
          ))}
        </>
      )}

      {/* HODNOCENÍ */}
      <Text style={styles.sectionTitle}>Hodnocení</Text>
      <Text style={styles.rating}>{ratingText}</Text>

      {/* RECENZE */}
      {Array.isArray(pestitel.reviews) && pestitel.reviews.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Recenze</Text>
          {pestitel.reviews.map((r, i) => (
            <View key={i} style={styles.reviewBox}>
              <Text style={styles.reviewName}>{r.jmeno}</Text>
              {typeof r.hodnoceni === "number" && (
                <Text style={styles.reviewStars}>
                  {"⭐".repeat(r.hodnoceni)}
                </Text>
              )}
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
        </>
      )}

      {/* UDÁLOSTI */}
      {Array.isArray(pestitel.udalosti) && pestitel.udalosti.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Události</Text>
          {pestitel.udalosti.map((e, i) => (
            <View key={i} style={styles.eventBox}>
              <Text style={styles.eventTitle}>{e.nazev}</Text>
              <Text style={styles.eventDate}>{e.datum}</Text>
              <Text style={styles.eventDesc}>{e.popis}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerImage: {
    width: "100%",
    height: 220,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
    marginHorizontal: 20,
  },
  address: {
    fontSize: 18,
    color: "#555",
    marginHorizontal: 20,
    marginBottom: 10,
  },

  navBtn: {
    backgroundColor: "#2196F3",
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  navBtnText: {
    color: "white",
    fontSize: 18,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 15,
  },

  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  productName: { fontSize: 18 },
  productPrice: { fontSize: 18, fontWeight: "600" },

  rating: {
    fontSize: 22,
    marginLeft: 20,
    marginBottom: 15,
  },

  reviewBox: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  reviewName: { fontSize: 18, fontWeight: "600" },
  reviewStars: { color: "#FFA000", fontSize: 16 },
  reviewText: { color: "#333" },

  eventBox: {
    marginHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  eventTitle: { fontSize: 18, fontWeight: "600" },
  eventDate: { color: "#666" },
  eventDesc: { color: "#333" },
});
