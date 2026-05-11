import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        try {
            await auth().sendPasswordResetEmail(email);
            Alert.alert('Success', 'Check your email to reset your password.');
            navigation.navigate('Login'); 
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to send reset email. Please check the email provided and try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Please enter your email address to receive a link to reset your password.</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email"
                placeholderTextColor="#A9A9A9"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Send Email</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#1D1B27',
    },
    subtitle: {
        fontSize: 16,
        color: '#A9A9A9',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        backgroundColor: '#2A2E43',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#1DB954',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
