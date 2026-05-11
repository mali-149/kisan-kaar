import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Importing the images from the animation folder
import wheatImage from '../assets/animations/wheat.png';
import sugarCaneImage from '../assets/animations/Sugar_cane.png';
import cornImage from '../assets/animations/corn.png';
import cottonImage from '../assets/animations/cotton.png';
import riceImage from '../assets/animations/rice.png';

const MarketRates = () => {
  const navigation = useNavigation();

  const handleWheat = () => {
    navigation.navigate('Wheat');
  };
  const handleSugar = () => {
    navigation.navigate('Sugar Cane');
  };
  const handleRice = () => {
    navigation.navigate('Rice');
  };
  const handleCotton = () => {
    navigation.navigate('Cotton');
  };
  const handleCorn = () => {
    navigation.navigate('Corn');
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.headingtxt}>Crops Fertilizer Calculator</Text>
        <Text style={styles.txt}>Here you will get the Required Fertilizer Quantity for your Crops</Text>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.itemCard} onPress={handleWheat}>
          <Image source={wheatImage} style={styles.image} />
          <Text style={styles.txt}>Wheat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemCard} onPress={handleSugar}>
          <Image source={sugarCaneImage} style={styles.image} />
          <Text style={styles.txt}>Sugar Cane</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.itemCard} onPress={handleRice}>
          <Image source={riceImage} style={styles.image} />
          <Text style={styles.txt}>Rice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemCard} onPress={handleCotton}>
          <Image source={cottonImage} style={styles.image} />
          <Text style={styles.txt}>Cotton</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.itemCard} onPress={handleCorn}>
          <Image source={cornImage} style={styles.image} />
          <Text style={styles.txt}>Corn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  itemCard: {
    height: 150,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#1E3D15',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
    width: 150,
  },
  txt: {
    fontFamily: 'WorkSans-Bold',
    color: '#1E3D15',
    marginTop: 10,
  },
  headingtxt: {
    fontFamily: 'WorkSans-Bold',
    color: '#1E3D15',
    fontSize: 25,
    marginTop: 15,
  },
  image: {
    width: 90,
    height: 90,
  },
});

export default MarketRates;
