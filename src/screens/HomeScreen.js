import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native-paper';
import { db } from '../services/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    const q = query(collection(db, "requests"), where("status", "==", "active"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      console.log("Güncel İlan Sayısı:", docs.length); 
      setRequests(docs);
    });

    return () => unsubscribe();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        // KEY EKLEME: İlan sayısı değiştiğinde haritayı render olmaya zorlar
        key={requests.length} 
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02, // Daha yakından bakmak için düşürdük
          longitudeDelta: 0.02,
        }}
        showsUserLocation={true}
      >
        {requests.map((item, index) => (
          <Marker
            key={item.id}
            coordinate={{
              // ÜST ÜSTE BİNMEYİ ÖNLEME: 
              // Eğer koordinatlar aynıysa marker'ı çok küçük bir miktar kaydırır
              latitude: item.latitude + (index * 0.00005), 
              longitude: item.longitude + (index * 0.00005),
            }}
            pinColor={item.category === 'Pets' ? 'orange' : item.category === 'Tools' ? 'blue' : 'red'}
            // Performans ve canlı güncelleme için:
            tracksViewChanges={false} 
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                <Text numberOfLines={3}>{item.description}</Text>
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
  callout: { width: 200, padding: 5 },
  categoryText: { fontSize: 10, color: 'gray', marginTop: 5 }
});