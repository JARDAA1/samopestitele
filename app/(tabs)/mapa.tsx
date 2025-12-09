import MapView, { Marker, Circle } from "react-native-maps";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import pestiteleData from "../data/pestitele.json";

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [radius, setRadius] = useState(10); // km
  const [filteredPestitele, setFilteredPestitele] = useState(pestiteleData);

  // Získání polohy uživatele
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Přístup k poloze byl zamítnut');
        Alert.alert(
          "Poloha",
          "Pro zobrazení pěstitelů v okolí potřebujeme přístup k vaší poloze.",
          [{ text: "OK" }]
        );
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    })();
  }, []);

  // Výpočet vzdálenosti mezi dvěma body (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // poloměr Země v km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Filtrování pěstitelů podle vzdálenosti
  useEffect(() => {
    if (!location) {
      setFilteredPestitele(pestiteleData);
      return;
    }

    const filtered = pestiteleData.map(p => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        p.gps_lat,
        p.gps_lng
      );
      return { ...p, distance };
    }).filter(p => p.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    setFilteredPestitele(filtered);
  }, [location, radius]);

  const radiusOptions = [5, 10, 20, 50];

  // Výchozí region
  const initialRegion = location ? {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  } : {
    latitude: 50.1,
    longitude: 14.5,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mapa pěstitelů</Text>
        
        {location && (
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>
              📍 Nalezeno: {filteredPestitele.length}
            </Text>
          </View>
        )}

        {/* Filtry vzdálenosti */}
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Okruh:</Text>
          {radiusOptions.map(r => (
            <TouchableOpacity
              key={r}
              style={[
                styles.filterBtn,
                radius === r && styles.filterBtnActive
              ]}
              onPress={() => setRadius(r)}
            >
              <Text style={[
                styles.filterText,
                radius === r && styles.filterTextActive
              ]}>
                {r} km
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* Kruh okolí */}
        {location && (
          <Circle
            center={location}
            radius={radius * 1000} // převod na metry
            strokeColor="rgba(76, 175, 80, 0.5)"
            fillColor="rgba(76, 175, 80, 0.1)"
          />
        )}

        {/* Markery pěstitelů */}
        {filteredPestitele.map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.gps_lat, longitude: p.gps_lng }}
            title={p.nazev}
            description={p.distance ? `${p.distance.toFixed(1)} km` : p.adresa}
            onPress={() => router.push(`/pestitele/${p.id}`)}
          />
        ))}
      </MapView>

      {errorMsg && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  
  header: {
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  statsRow: {
    marginBottom: 10,
  },

  statsText: {
    fontSize: 15,
    color: "#666",
    fontWeight: "600",
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
    color: "#333",
  },

  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    marginBottom: 8,
  },

  filterBtnActive: {
    backgroundColor: "#4CAF50",
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },

  filterTextActive: {
    color: "#fff",
  },

  map: {
    flex: 1,
    width: Dimensions.get("window").width,
  },

  errorBanner: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: "#FF9800",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  errorText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
