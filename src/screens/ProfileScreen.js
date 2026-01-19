import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar, Title, Caption, Button, Card, List } from 'react-native-paper';
import { auth } from '../services/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
  const user = auth.currentUser;

  const handleLogout = () => {
    Alert.alert(
      "Çıkış Yap",
      "Oturumu kapatmak istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        { text: "Evet", onPress: () => signOut(auth) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Profil Başlık Kısmı */}
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Text 
            size={80} 
            label={user?.email ? user.email.substring(0, 2).toUpperCase() : "U"} 
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
              Komşu Kullanıcı
            </Title>
            <Caption style={styles.caption}>{user?.email}</Caption>
          </View>
        </View>
      </View>

      {/* İstatistikler veya Bilgiler */}
      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, { borderRightColor: '#dddddd', borderRightWidth: 1 }]}>
          <Title>0</Title>
          <Caption>Yardımlarım</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>100</Title>
          <Caption>Puan (Karma)</Caption>
        </View>
      </View>

      {/* Menü Seçenekleri */}
      <View style={styles.menuWrapper}>
        <List.Item
          title="Yardım İsteklerim"
          left={props => <List.Icon {...props} icon="history" />}
          onPress={() => {}}
        />
        <List.Item
          title="Ayarlar"
          left={props => <List.Icon {...props} icon="cog" />}
          onPress={() => {}}
        />
        <Button 
          mode="contained" 
          onPress={handleLogout} 
          style={styles.logoutButton}
          buttonColor="#e74c3c"
        >
          Çıkış Yap
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  userInfoSection: { paddingHorizontal: 30, marginBottom: 25, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold' },
  caption: { fontSize: 14, lineHeight: 14, fontWeight: '500' },
  infoBoxWrapper: { borderBottomColor: '#dddddd', borderBottomWidth: 1, borderTopColor: '#dddddd', borderTopWidth: 1, flexDirection: 'row', height: 100 },
  infoBox: { width: '50%', alignItems: 'center', justifyContent: 'center' },
  menuWrapper: { marginTop: 10, paddingHorizontal: 20 },
  logoutButton: { marginTop: 30 },
});