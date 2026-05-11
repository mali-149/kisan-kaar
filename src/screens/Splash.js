import { StyleSheet, Text, View, Image, StatusBar, } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login')
      
    }, 2000);
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} hidden />
      <Image style={styles.logo} source={require('../assets/splash2.png')} />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    height: 400,
    width: '100%'
  }
})