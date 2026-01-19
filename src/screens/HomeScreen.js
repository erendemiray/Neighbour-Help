import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { ActivityIndicator, Card, Title, Paragraph } from 'react-native-paper';
import { db } from '../services/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Konum Al ve İzin İste
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Konum izni gerekli!');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
      setLoading(false);
    })();

    // 2. Firestore'daki Aktif İlanları Dinle
    const q = query(collection(db, "requests"), where("status", "==", "active"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setRequests(docs);
    });

    return () => unsubscribe(); // Sayfa kapandığında dinlemeyi durdur
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {requests.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            // Kategoriye göre pin rengi değiştirebiliriz
            pinColor={item.category === 'Pets' ? 'orange' : item.category === 'Tools' ? 'blue' : 'red'}
          >
            {/* Pin'e tıklandığında açılacak kutucuk */}
            <Callout>
              <View style={styles.callout}>
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text style={styles.categoryText}>Kategori: {item.category}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  callout: {
    width: 200,
    padding: 10,
  },
  categoryText: {
    fontSize: 10,
    color: 'gray',
    marginTop: 5
  }
});