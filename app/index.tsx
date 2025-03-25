import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router'; 

export default function Index() {
  return (
    <View style={styles.container}>
        <LinearGradient
            colors={['#c4e2e8', '#f2ffc4']}
            style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            }}
            />
        <Image 
            source={require('../assets/images/scooter.png')} 
            style={{ width: 400, height: 300 }}
            resizeMode="contain"
            />
        <View style={styles.buttonContainer}>
            <Link href="/login" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </Pressable>
            </Link>
            <Link href="/register" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        Create Account
                    </Text>
                </Pressable>
            </Link>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#333',
    fontSize: 32,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
  },
  button: {
    backgroundColor: '#f2ffc4',
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    borderRadius: 50,
    marginBottom: 18,
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
});
