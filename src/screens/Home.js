import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WeatherComponent from '../components/WeatherComponent';
import { useNavigation } from '@react-navigation/native';
import Carousel from '../components/Carousel';

const Home = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Weather');
  };
  const handleSell = () => {
    navigation.navigate('SellProduce')
  }
  const handleRates = () => {
    navigation.navigate('MarketRates')
  }
  const handleCrops = () => {
    navigation.navigate('My Crops')
  }
  const handleMap=()=>{
    navigation.navigate('Scan')
  }
  const handleMarket=()=>{
    navigation.navigate('Market')
  }
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100,backgroundColor:'#ffff' }}>
      <Carousel />
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.cardContainer}>
          <WeatherComponent />
        </View>
      </TouchableOpacity>
      <View style={styles.imageHolder}>
        <Image
          source={require('../assets/animations/marketfar.jpg')}
          style={styles.image}></Image>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.itemCard} onPress={handleSell}>
          <Text style={styles.txt}>Sell Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemCard} onPress={handleRates}>
          <Text style={styles.txt}>Calculator</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageHolder}>
        <Image
          source={require('../assets/animations/farm.jpg')}
          style={styles.image}></Image>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.itemCard} onPress={handleCrops}>
          <Text style={styles.txt}>Add Crops</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemCard} onPress={handleMarket}>
          <Text style={styles.txt}>Market</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageHolder}>
        <Image
          source={require('../assets/animations/tech.jpg')}
          style={styles.image}></Image>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardContainer: {
    width: '95%',
    height: 150,
    borderRadius: 10,
    borderColor: '#1E3D15',
    borderWidth: 3,
    marginTop: 15,
    alignSelf: 'center',
    elevation: 0,
    color:'#1DB954'
  },
  imageHolder: {
    width: '95%',
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#1E3D15',
    borderRadius: 10,
  },
  itemCard: {
    height: 90,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#1E3D15',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
    width: 160,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-around', marginBottom: 5,
  },
  txt: {
    fontFamily: 'WorkSans-Bold',
    color: '#1E3D15'
  },
});
