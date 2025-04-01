import { Text, View, StyleSheet, Pressable } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, router } from 'expo-router';
import MenuButton from '@/components/ui/MenuButton';

export default function Tasks() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <MenuButton navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Choose task</Text>
        
        <Pressable 
          style={styles.taskButton} 
          onPress={() => router.push('/main/fix-parking')}
        >
          <Text style={styles.taskButtonText}>Fix parking</Text>
        </Pressable>

        <Pressable 
          style={styles.taskButton}
          onPress={() => router.push('/main/move-scooter')}
        >
          <Text style={styles.taskButtonText}>Move Scooter</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    marginBottom: 40,
    color: '#333',
  },
  taskButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskButtonText: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
}); 