import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const GovRates = () => {
  const [prices, setPrices] = useState([
    { crop: 'Wheat', price: '2600 to 3000' },
    { crop: 'Corn', price: '1700 to 2200' },
    { crop: 'Rice', price: '4500 to 5950' },
    { crop: 'Cotton', price: '8000 to 10400' },
    { crop: 'Sugar Cane', price: '450 to 500' },
  ]);

  const translateX = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -970, 
        duration: 11000, 
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ flexDirection: 'row', alignItems: 'flex-start', transform: [{ translateX }] }}>
        {prices.map((item, index) => (
          <View key={index} style={styles.priceItem}>
            <Text style={styles.cropText}>{item.crop}</Text>
            <Text style={styles.priceText}>{item.price} RS</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    height: 50, 
    overflow: 'hidden', 
  },
  priceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cropText: {
    fontFamily:'WorkSans-Bold',
    marginRight: 10,
    color:'#1E3D15'
  },
  priceText: {
    fontSize: 16,
    color: 'green',
  },
});

export default GovRates;
