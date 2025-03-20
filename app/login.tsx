import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
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
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                    autoFocus
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                />
            </View>
            <Pressable style={styles.button} onPress={() => {alert('Login pressed')}}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    title: {
        color: '#333',
        fontSize: 32,
        marginBottom: 20,
    },
    inputContainer: {
        width: 300,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#f2ffc4',
        borderWidth: 1,
        borderColor: '#333',
        padding: 10,
        borderRadius: 5,
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#333',
        fontSize: 18,
    },
});
