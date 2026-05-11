import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utilis/AsyncStorage';

const { height, width } = Dimensions.get('window')

const OnBoarding = () => {

  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('Splash')
    setItem('onboarded','1')
  }
  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity {...props} style={styles.button}>
        <Text style={styles.btntext}>Done</Text>
      </TouchableOpacity>
    )
  }
  const nextButton =({...props})=> {
    return (
      <TouchableOpacity {...props} style={styles.button}>
        <Text style={styles.btntext}>Next</Text>
      </TouchableOpacity>
    )
  }
  const skipButton =({...props})=>{
    return (
      <TouchableOpacity {...props} style={styles.skipbutton}>
        <Text style={styles.btntext}>Skip</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.mainContainer}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        NextButtonComponent={nextButton}
        SkipButtonComponent={skipButton}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: '#bdb76b',
            image: <Image source={require('../assets/animations/connectivity.png')} style={styles.images} />,
            title: 'Enhance Connectivity',
            subtitle: 'Experience seamless connection with Agricultural Experts,Buyers and Sellers',
          },
          {
            backgroundColor: '#556b2f',
            image: <Image source={require('../assets/animations/weather.png')} style={styles.images} />,
            title: 'Real-Time Weather Updates',
            subtitle: 'Get accurate weather forecasts to plan your day effectively',
          },
          {
            backgroundColor: '#008b8b',
            image: <Image source={require('../assets/animations/market.png')} style={styles.images} />,
            title: 'Explore Market Trends',
            subtitle: 'Stay informed about the latest market trends and insights',
          },
          {
            backgroundColor: '#228b22',
            image: <Image source={require('../assets/animations/smartness.png')} style={styles.images} />,
            title: 'Smart Farming Solutions',
            subtitle: 'Optimize your farming operations with intelligent and smart technologies',
          },
        ]}
      />
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  images: {
    height: width * 0.9,
    width: width,
  },
  button:{
    padding:15,
    marginRight:5,
    backgroundColor:'black',
    borderRadius:25,
    width:90,
    alignItems:'center'
  },
  skipbutton:{
    padding:15,
    marginLeft:5,
    backgroundColor:'black',
    borderRadius:25,
    width:90,
    alignItems:'center'
  },
  title:{
    fontWeight:'bold',
    color:'white'
  },
  subtitle:{
    fontWeight:'600',
    color:'white'
  }
})