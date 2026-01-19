import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import MyRequestsScreen from '../screens/MyRequestsScreen';

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ title: 'Profilim' }} 
      />
      <Stack.Screen 
        name="MyRequests" 
        component={MyRequestsScreen} 
        options={{ title: 'Yardım İsteklerim' }} 
      />
    </Stack.Navigator>
  );
}