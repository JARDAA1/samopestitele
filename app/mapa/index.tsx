import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { router } from "expo-router";

const pestitele = [
  {
    id: 1,
    nazev: "Statek U Jabloně",
    lat: 50.3295,
    lng: 14.5407,
  },
  {
    id: 2,
    nazev: "Zelenina Pražská",
    lat: 50.02,
    lng: 14.48,
  },
  {
    id: 3,
    nazev: "Sady pod kopcem",
    lat: 50.24,
    lng: 14.32,
  },
];

export default function Mapa() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa pěstitelů</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.1,
          longitude: 14.5,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {pestitele.map((p) => (
          <Marker
  key={p.id}
  coordinate={{ latitude: p.lat, longitude: p.lng }}
  title={p.nazev}
  onPress={() => router.push(`/pestitele/${p.id}`)}
/>

        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    padding: 15,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
  },
});

