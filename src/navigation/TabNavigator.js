import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddRequestScreen from '../screens/AddRequestScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Map, PlusSquare, User } from 'lucide-react-native'; // İkonlar için

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Map" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({color}) => <Map color={color} size={24} /> }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddRequestScreen} 
        options={{ tabBarIcon: ({color}) => <PlusSquare color={color} size={24} /> }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({color}) => <User color={color} size={24} /> }}
      />
    </Tab.Navigator>
  );
}