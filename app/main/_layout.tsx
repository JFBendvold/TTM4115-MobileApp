import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="user" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Profile',
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}