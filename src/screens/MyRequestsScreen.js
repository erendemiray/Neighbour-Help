import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { List, Text, ActivityIndicator, Divider, IconButton } from 'react-native-paper';
import { db, auth } from '../services/firebaseConfig';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function MyRequestsScreen() {
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "requests"), 
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = [];
      snapshot.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
      setMyRequests(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (requestId) => {
    Alert.alert(
      "İsteği Kaldır",
      "Bu yardım isteği çözüldü mü? Haritadan kaldırılacaktır.",
      [
        { text: "Vazgeç", style: "cancel" },
        { 
          text: "Evet, Kaldır", 
          onPress: async () => {
            try {
              // Seçenek A: Tamamen silmek istersen:
              await deleteDoc(doc(db, "requests", requestId));
              
              // Seçenek B: Sadece pasife çekmek istersen (Arşiv için daha iyidir):
              // await updateDoc(doc(db, "requests", requestId), { status: 'completed' });
              
              Alert.alert("Başarılı", "İstek kaldırıldı.");
            } catch (error) {
              Alert.alert("Hata", "İşlem başarısız: " + error.message);
            }
          } 
        }
      ]
    );
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={myRequests}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.description}
            left={props => <List.Icon {...props} icon="tools" />}
            right={props => (
              <IconButton
                {...props}
                icon="delete-outline"
                iconColor="red"
                onPress={() => handleDelete(item.id)}
              />
            )}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Henüz bir yardım isteği oluşturmadınız.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyText: { textAlign: 'center', marginTop: 50, color: 'gray' }
});