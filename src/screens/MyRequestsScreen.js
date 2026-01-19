import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Text, ActivityIndicator, Divider } from 'react-native-paper';
import { db, auth } from '../services/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function MyRequestsScreen() {
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sadece mevcut kullanıcının ilanlarını filtrele
    const q = query(
      collection(db, "requests"), 
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = [];
      snapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setMyRequests(docs);
      setLoading(false);
    }, (error) => {
      console.error("Hata:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
            right={() => <Text style={styles.category}>{item.category}</Text>}
            titleStyle={{ fontWeight: 'bold' }}
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
  category: { alignSelf: 'center', marginRight: 15, fontSize: 12, color: '#666' },
  emptyText: { textAlign: 'center', marginTop: 50, color: 'gray' }
});