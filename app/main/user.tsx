import { Text, View, StyleSheet, Pressable } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import MenuButton from '@/components/ui/MenuButton';

interface Ride {
  date: string;
  distance: string;
  reward: number;
}

export default function Profile() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  // TODO: Fetch this data from the API
  const mockData = {
    walletBalance: 198,
    totalEarned: 1842,
    rides: [
      {
        date: "Sat 02.03.24",
        distance: "2.3km",
        reward: 64,
      },
      {
        date: "Thu 29.02.24",
        distance: "3.1km",
        reward: 88,
      },
      {
        date: "Mon 26.02.24",
        distance: "1.9km",
        reward: 54,
      },
      {
        date: "Sun 25.02.24",
        distance: "4.0km",
        reward: 128,
      },
      {
        date: "Sat 24.02.24",
        distance: "2.1km",
        reward: 60,
      },
    ] as Ride[],
  };

  const handleCashOut = () => {
    // TODO: Implement cash out functionality
    console.log('Cashing out...');
  };

  return (
    <View style={styles.container}>
      <MenuButton navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>My Rewards</Text>
        
        <View style={styles.walletInfo}>
          <Text style={styles.walletLabel}>In wallet:</Text>
          <Text style={styles.walletAmount}>{mockData.walletBalance} kr</Text>
          <Text style={styles.totalEarned}>Total amount earned: {mockData.totalEarned}kr</Text>
        </View>

        <View style={styles.ridesList}>
          <View style={styles.rideHeader}>
            <Text style={[styles.headerText, { flex: 2 }]}>Date</Text>
            <Text style={[styles.headerText, { flex: 2 }]}>Distance</Text>
            <Text style={[styles.headerText, { flex: 1 }]}>Reward</Text>
          </View>
          {mockData.rides.map((ride, index) => (
            <View key={index} style={styles.rideItem}>
              <Text style={[styles.rideText, { flex: 2 }]}>{ride.date}</Text>
              <Text style={[styles.rideText, { flex: 2 }]}>{ride.distance}</Text>
              <Text style={[styles.rideText, { flex: 1 }]}>{ride.reward}kr</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.cashOutButton} onPress={handleCashOut}>
            <Text style={styles.cashOutText}>Cash out</Text>
          </Pressable>
        </View>
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
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  walletInfo: {
    marginBottom: 30,
    alignItems: 'center',
  },
  walletLabel: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Nunito',
  },
  walletAmount: {
    fontSize: 32,
    color: '#333',
    fontFamily: 'Nunito-Bold',
    marginVertical: 5,
  },
  totalEarned: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Nunito',
  },
  ridesList: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Nunito-Bold',
  },
  rideItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rideText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Nunito',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  cashOutButton: {
    backgroundColor: '#f2ffc4',
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cashOutText: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
});
