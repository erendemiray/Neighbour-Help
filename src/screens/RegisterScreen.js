import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert("Başarılı", "Hesap oluşturuldu!"))
      .catch(error => Alert.alert("Hata", error.message));
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Yeni Hesap Oluştur</Title>
      <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} />
      <TextInput label="Şifre" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={styles.input} />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>Kayıt Ol</Button>
      <Button onPress={() => navigation.goBack()}>Giriş Ekranına Dön</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 }
});