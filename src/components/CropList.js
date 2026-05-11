import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import cropsData from '../data/CropData';

const CropList = ({ navigation }) => {
  return cropsData.map(crop => (
    <TouchableOpacity key={crop.id} onPress={() => navigation.navigate('CropDetails', { crop })}>
      <Text>{crop.name}</Text>
    </TouchableOpacity>
  ));
};

export default CropList;
