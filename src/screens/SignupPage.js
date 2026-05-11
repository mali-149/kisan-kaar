import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ToastAndroid,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SignupPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validInput = (name, email, phoneNumber, password, confirmPassword) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^03[0-9]{9}$/;

    const isEmailValid = emailRegex.test(email.toLowerCase()) && email.endsWith('@gmail.com');
    if (!isEmailValid) {
      Alert.alert('Please use a valid Email');
      return false;
    }

    if (!nameRegex.test(name) || !name) {
      Alert.alert('Name must contain letters and spaces');
      return false;
    }

    if (!phoneRegex.test(phoneNumber) || phoneNumber.length > 11) {
      Alert.alert('Please enter a valid phone number');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch, please recheck');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validInput(name, email, phoneNumber, password, confirmPassword)) {
      return;
    }
    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredentials.user;

      const userData = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      };
      await firestore().collection('users').doc(user.uid).set(userData);

      await user.sendEmailVerification();
      ToastAndroid.show('Verification email sent. Please check your inbox.', ToastAndroid.LONG);
      
      await auth().signOut();
      navigation.navigate('Login');

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        Alert.alert('Email already in use');
      } else if (err.code === 'auth/invalid-email') {
        Alert.alert('This email is invalid');
      } else {
        console.error(err);
        ToastAndroid.show('An error occurred, please try again', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Please fill the input below here</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          placeholderTextColor={'#A9A9A9'}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone"
          placeholderTextColor={'#A9A9A9'}
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email e.g franklin@gmail.com"
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
      <View style={styles.inputContainer}>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor={'#A9A9A9'}
          style={styles.input}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}> Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    color: '#1D1B27',
    fontSize: 30,
    marginBottom: 10,
    fontFamily: 'WorkSans-Bold'
  },
  subtitle: {
    color: '#A9A9A9',
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'WorkSans-Bold'
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
    fontFamily: 'WorkSans-Light'
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
    fontFamily: 'WorkSans-Bold'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#A9A9A9',
    fontSize: 16,
    fontFamily: 'WorkSans-Light'
  },
  signInText: {
    color: '#1DB954',
    fontSize: 16,
    marginLeft: 5,
    fontFamily: 'WorkSans-Light'
  },
});
