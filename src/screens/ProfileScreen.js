import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreeen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen (Map)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});