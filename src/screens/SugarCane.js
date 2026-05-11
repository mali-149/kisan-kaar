import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SugarCane = () => {
  const [acres, setAcres] = useState(1);
  const [showDetails, setShowDetails] = useState(false); 

  const increaseAcres = () => {
    setAcres(prevAcres => prevAcres + 1);
  };

  const decreaseAcres = () => {
    if (acres > 1) {
      setAcres(prevAcres => prevAcres - 1);
    }
  };

  const handleCalculate = () => {
    setShowDetails(!showDetails);
  };

  const fertilizerDetails = [
    { name: 'Urea', quantity: 121 },
    { name: 'SSP', quantity: 121 },
    { name: 'MOP', quantity: 40 },
    { name: 'DAP', quantity: 0 },
  ];

  const calculatedDetails = fertilizerDetails.map(detail => ({
    name: detail.name,
    quantity: detail.quantity * acres,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Select Your Acres</Text>
        <View style={styles.acresContainer}>
          <TouchableOpacity onPress={decreaseAcres} style={[styles.button, styles.acresButton]}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.acresText}>{acres}</Text>
          <TouchableOpacity onPress={increaseAcres} style={[styles.button, styles.acresButton]}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleCalculate} style={styles.calculateButton}>
          <Text style={styles.calculateText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      {showDetails && (
        <View style={styles.detailsContainer}>
          {calculatedDetails.map((detail, index) => (
            <View key={index} style={styles.detailCard}>
              <Text style={styles.detailText}>{detail.name}</Text>
              <Text style={styles.detailText}>{detail.quantity} kg</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#1E3D15',
    marginTop: 20,
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  acresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 25,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3D15',
  },
  acresButton: {
    marginHorizontal: 30,
  },
  acresText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  calculateButton: {
    backgroundColor: '#1E3D15',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  calculateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  detailCard: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    padding: 40,
    borderWidth: 1.5,
    borderColor: '#1E3D15',
    width:150
  },
  detailText: {
    color: '#1E3D15',
  },
});

export default SugarCane ;
