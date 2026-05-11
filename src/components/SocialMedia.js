import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

const SocialMedia = () => {

    const navigation = useNavigation();
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '113586607331-u9onpktbkdji1v623oliib3dst9qt86m.apps.googleusercontent.com',
          });
    },[])

    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Sign-in in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Play Services not available');
            } else {
                Alert.alert(`Error: ${error.message}`);
            }
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
                <Image
                    source={require('../assets/google3.png')}
                    style={styles.imgrsc}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SocialMedia;

const styles = StyleSheet.create({
    imgrsc: {
        width: 45,
        height: 45,
    },
    container: {
        flex: 1
    },
    button: {
        width: 45,
        alignContent: 'center', alignItems: 'center', alignSelf: 'center',
        borderRadius: 10,
        marginTop: 40,
    }
});
