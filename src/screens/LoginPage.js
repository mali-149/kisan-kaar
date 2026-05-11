import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleEmail = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password fields cannot be empty.');
      return;
    }

    try {
      const userCredentials = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredentials.user;

      if (user && !user.emailVerified) {
        await auth().signOut();
        Alert.alert('Error', 'Please verify your email before logging in.');
        return;
      }

      ToastAndroid.show('Welcome to KisanKaar', ToastAndroid.LONG);
      navigation.navigate('Drawer');
    } catch (err) {
      console.error(err);
      switch (err.code) {
        case 'auth/invalid-email':
          Alert.alert('Error', 'The email address is badly formatted.');
          break;
        case 'auth/user-not-found':
          Alert.alert('Error', 'No user found with this email.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Error', 'Incorrect password. Please try again.');
          break;
        case 'auth/invalid-credential':
          Alert.alert('Error', 'The credentials provided are invalid.');
          break;
        default:
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleNavigation = () => {
    navigation.navigate('SignUp');
  };

  const handleForget = () => {
    navigation.navigate('Reset');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/splash1.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue.</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={'#A9A9A9'}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={'#A9A9A9'}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleEmail}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForget}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleNavigation}>
            <Text style={styles.signUpText}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
  },
  content: {
    flex: 2,
  },
  title: {
    color: '#1D1B27',
    fontSize: 30,
    marginBottom: 10,
    fontFamily:'WorkSans-Bold'
  },
  subtitle: {
    color: '#A9A9A9',
    fontSize: 18,
    marginBottom: 20,
    fontFamily:'WorkSans-Bold'
  },
  inputContainer: {
    backgroundColor: '#2A2E43',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  input: {
    height: 50,
    color: '#FFFFFF',
    fontFamily:'WorkSans-Light'
  },
  button: {
    backgroundColor: '#1DB954',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily:'WorkSans-Bold'
  },
  forgotPassword: {
    color: '#A9A9A9',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily:'WorkSans-Light'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#A9A9A9',
    fontSize: 16,
    fontFamily:'WorkSans-Light'
  },
  signUpText: {
    color: '#1DB954',
    fontSize: 16,
    marginLeft: 5,
    fontFamily:'WorkSans-Light'
  },
});
