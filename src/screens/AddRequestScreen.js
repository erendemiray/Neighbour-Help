import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, SegmentedButtons } from 'react-native-paper';
import { db, auth } from '../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import * as Location from 'expo-location';

export default function AddRequestScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Task');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !description) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      // İlanın konumunu o anki konum olarak alıyoruz
      let location = await Location.getCurrentPositionAsync({});
      
      // Firestore'a kaydet
      await addDoc(collection(db, "requests"), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        title,
        description,
        category,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        status: 'active',
        createdAt: serverTimestamp()
      });

      Alert.alert("Başarılı", "Yardım isteğin komşularına iletildi!");
      setTitle('');
      setDescription('');
      navigation.navigate('Map'); // Haritaya geri dön
    } catch (error) {
      Alert.alert("Hata", "Kaydedilirken bir sorun oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Yeni Yardım İsteği</Title>
      
      <SegmentedButtons
        value={category}
        onValueChange={setCategory}
        buttons={[
          { value: 'Task', label: 'İş/Görev' },
          { value: 'Pets', label: 'Evcil Hayvan' },
          { value: 'Tools', label: 'Eşya/Alet' },
        ]}
        style={styles.segment}
      />

      <TextInput label="Başlık (Örn: Matkap lazım)" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
      <TextInput label="Açıklama" value={description} onChangeText={setDescription} mode="outlined" multiline numberOfLines={4} style={styles.input} />
      
      <Button mode="contained" onPress={handleSave} loading={loading} disabled={loading} style={styles.button}>
        İsteği Yayınla
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { textAlign: 'center', marginBottom: 20 },
  segment: { marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginTop: 10 }
});