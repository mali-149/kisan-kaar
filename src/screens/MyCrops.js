import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import cropsData from '../data/CropData';

import wheatImage from '../assets/animations/wheat.png';
import sugarCaneImage from '../assets/animations/Sugar_cane.png';
import cornImage from '../assets/animations/corn.png';
import cottonImage from '../assets/animations/cotton.png';
import riceImage from '../assets/animations/rice.png';

const updatedCropsData = cropsData.map(crop => {
  switch (crop.name) {
    case 'Wheat':
      return { ...crop, image: wheatImage };
    case 'Sugar Cane':
      return { ...crop, image: sugarCaneImage };
    case 'Corn':
      return { ...crop, image: cornImage };
    case 'Cotton':
      return { ...crop, image: cottonImage };
    case 'Rice':
      return { ...crop, image: riceImage };
    default:
      return crop;
  }
});

const MyCrops = () => {
  const navigation = useNavigation();
  const [selectedCrops, setSelectedCrops] = useState([]);

  const handleSelectCrop = crop => {
    if (selectedCrops.some(selectedCrop => selectedCrop.id === crop.id)) {
      setSelectedCrops(
        selectedCrops.filter(selectedCrop => selectedCrop.id !== crop.id),
      );
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handlePressCard = crop => {
    navigation.navigate('CropDetails', { crop });
  };

  const renderCropButton = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.cropButton,
        selectedCrops.some(crop => crop.id === item.id) &&
        styles.selectedCropButton,
      ]}
      onPress={() => handleSelectCrop(item)}>
      <Text style={styles.cropButtonText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:100}}>
      <View style={styles.cropSelectionContainer}>
        <FlatList
          data={updatedCropsData}
          renderItem={renderCropButton}
          keyExtractor={item => item.id}
          horizontal
          contentContainerStyle={styles.cropSelectionContent}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.cardsContainer}>
        {selectedCrops.map(crop => (
          <TouchableOpacity
            key={crop.id}
            style={styles.card}
            onPress={() => handlePressCard(crop)}>
            <Image source={crop.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{crop.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  cropSelectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cropSelectionContent: {
    alignItems: 'center',
  },
  cropButton: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedCropButton: {
    backgroundColor: '#006400',
  },
  cropButtonText: {
    color: '#000',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1.5,
    borderColor: '#1E3D15',
  },
  cardImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E3D15',
  },
  cardDescription: {
    fontSize: 14,
    color: '#1E3D15',
    textAlign: 'center',
  },
});

export default MyCrops;
