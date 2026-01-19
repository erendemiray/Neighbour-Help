import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebaseConfig';
import TabNavigator from './src/navigation/TabNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        {user ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
}