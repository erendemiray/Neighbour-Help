import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native-paper';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Konum izni iste
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Konum izni reddedildi');
        return;
      }

      // Mevcut konumu al
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} size="large" />
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
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {/* Örnek bir yardım isteği marker'ı */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude + 0.001,
            longitude: location.coords.longitude + 0.001,
          }}
          title="Yardım İsteği"
          description="Ağır bir dolap taşınacak."
        />
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});