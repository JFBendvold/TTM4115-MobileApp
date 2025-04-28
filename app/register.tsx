import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RegisterUser, VerifyUser, GetNewCode } from '@/services/auth-service';
import React, { useState } from 'react';
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationCodeSent, setVerificationCodeSent] = useState(false);

    const handleRegister = async () => {
        if (verificationCodeSent) {
            // Verify the user with the verification code
            try {
                const response = await VerifyUser(username, verificationCode);
                alert('Verification successful!');
                // Navigate to the next screen or perform any other action
                router.push('/main');
            } catch (error) {
                alert('Verification failed. Please check your code and try again.');
                const response = await GetNewCode(username);
                alert('New verification code sent: ' + response.Code);
            }
            return;
        }

        // Check if both username and password are provided
        if (!username || !password) {
            alert('Please enter both username and password.');
            const response = await RegisterUser(username, password);
            alert('Verification code: ' + response.Code);
            return;
        }

        try {
            const response = await RegisterUser(username, password);
            alert('Verification code: ' + response.Code);
            setVerificationCodeSent(true);

            // Store the username in AsyncStorage
            await AsyncStorage.setItem('username', username);
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed, user may already exist. Please try again.');
        }
    };

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
            <Text style={styles.title}>
                Register
            </Text>
            {!verificationCodeSent && (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={setUsername}
                    autoFocus
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            )}
            {verificationCodeSent && (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Verification Code"
                    placeholderTextColor="#999"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    autoCapitalize='none'
                />
            </View>
            )}
            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>
                    {verificationCodeSent ? 'Verify' : 'Register'}
                </Text>
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
        fontFamily: 'Nunito-Bold',
    },
    inputContainer: {
        width: 300,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
        fontFamily: 'Nunito',
    },
    button: {
        backgroundColor: '#f2ffc4',
        borderWidth: 1,
        borderColor: '#333',
        padding: 10,
        borderRadius: 20,
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
