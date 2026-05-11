import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkPermissions();
    }
  }, []);

  const checkPermissions = async () => {
    try {
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      const storageGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED && storageGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissions granted');
      } else {
        console.log('Permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const source = { uri: image.path };
      setAvatar(source);
    }).catch(error => {
      console.warn(error);
    });
  };

  const handleSavePhoto = async () => {
    if (avatar) {
      try {
        await AsyncStorage.setItem('userAvatar', avatar.uri);
        console.log('Photo saved');
        navigation.goBack();
      } catch (error) {
        console.warn('Failed to save the photo', error);
      }
    } else {
      console.warn('No photo to save');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        {avatar ? (
          <Avatar.Image source={avatar} size={130} style={styles.AvatarContainer} />
        ) : (
          <Avatar.Image
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={130}
            style={styles.AvatarContainer}
          />
        )}
        <TouchableOpacity style={styles.upload} onPress={handleChoosePhoto}>
          <Text style={styles.upLoadtxt}>Upload Profile Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.savebtn} onPress={handleSavePhoto}>
          <Text style={styles.savetxt}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  AvatarContainer: {
    alignSelf: 'center',
    marginTop: '10%',
  },
  upLoadtxt: {
    color: 'black',
    fontFamily: 'WorkSans-Medium',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 15,
  },
  savebtn: {
    backgroundColor: '#1E3D15',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
    marginTop: 30,
    width: '35%',
    alignSelf: 'center',
  },
  savetxt: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'WorkSans-Medium',
    alignSelf: 'center',
  },
  upload: {
    width: '50%',
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
  },
});
