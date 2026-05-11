import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Avatar,
  Title,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Loading Name...',
    email: 'Loading Email...',
    phone: 'Loading Phone...',
    location: 'Loading Location...',
  });

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        const userRef = firestore().collection('users').doc(userAuth.uid);
        userRef.get().then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            console.log('Fetched User Data:', userData);
            setUser(userData);
          } else {
            console.log('User data does not exist');
          }
        }).catch(error => {
          console.log('Error fetching user data:', error.message);
        });
      }
    });

    const loadAvatar = async () => {
      try {
        const avatarUri = await AsyncStorage.getItem('userAvatar');
        if (avatarUri) {
          setAvatar({ uri: avatarUri });
        }
      } catch (error) {
        console.warn('Failed to load the photo', error);
      }
    };

    loadAvatar();

    const focusListener = navigation.addListener('focus', () => {
      loadAvatar();
    });

    return () => {
      subscriber();
      focusListener();
    };
  }, [navigation]);

  const navigation = useNavigation();

  const confirmLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to Log Out?', [
      { text: 'Cancel', onPress: () => console.log('Log Out Cancelled'), style: 'cancel' },
      { text: 'Log Out', onPress: () => handleLogOut() },
    ]);
  };

  const handleLogOut = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert('User Logged Out');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Log Out Failed');
      });
  };

  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={avatar || { uri: 'https://api.adorable.io/avatars/80/abott@adorable.png' }}
            size={80}
          />
          <View style={{ marginLeft: 20,marginTop:20 }}>
            <Title style={styles.title}>
              {user.name}
            </Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            {user.phoneNumber}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            {user.email}
          </Text>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={confirmLogout}>
          <View style={styles.menuItem}>
            <Ionicons name="log-out-outline" color="red" size={25} />
            <Text style={styles.log}>Log Out</Text>
          </View>
        </TouchableRipple>
      </View>
      <TouchableOpacity style={styles.editContainer} onPress={handleEdit}>
        <Text style={styles.edittxt}>Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  log: {
    color: 'red',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  editContainer: {
    marginTop: 40,
    alignSelf: 'center',
    backgroundColor: '#1E3D15',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  edittxt: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
