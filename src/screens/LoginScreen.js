import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .catch(error => Alert.alert("Hata", error.message));
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>NeighbourHelp'e Hoş Geldiniz</Title>
      <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} />
      <TextInput label="Şifre" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={styles.input} />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>Giriş Yap</Button>
      <Button onPress={() => navigation.navigate('Register')}>Hesabın yok mu? Kayıt Ol</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 }
});