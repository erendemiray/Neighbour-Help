import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddRequestScreen from '../screens/AddRequestScreen';
import ProfileNavigator from './ProfileNavigator'; // Profil akışını buradan yönetiyoruz
import { Map, PlusSquare, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#2ecc71', // Aktif ikon rengi (NeighbourHelp Yeşili)
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Map" 
        component={HomeScreen} 
        options={{ 
          title: 'Harita',
          tabBarIcon: ({color}) => <Map color={color} size={24} /> 
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddRequestScreen} 
        options={{ 
          title: 'İlan Ver',
          tabBarIcon: ({color}) => <PlusSquare color={color} size={24} /> 
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileNavigator} 
        options={{ 
          title: 'Profil',
          tabBarIcon: ({color}) => <User color={color} size={24} /> 
        }}
      />
    </Tab.Navigator>
  );
}