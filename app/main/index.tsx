import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import DiscoverMap from '@/components/maps/DiscoverMap';
import MenuButton from '@/components/ui/MenuButton';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';

export default function Index() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.container}>
        <MenuButton navigation={navigation} />
        <DiscoverMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
