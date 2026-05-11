import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const App = () => {
  const [imageUri, setImageUri] = useState(null);
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        detectDisease(response.assets[0].uri);
      }
    });
  };

  const detectDisease = async (uri) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('images', {
        uri: uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('modifiers', 'health=all');
      formData.append('plant_details', 'diseases');

      console.log('FormData:', formData);

      const response = await axios.post('https://plant.id/api/v3/identification', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Api-Key': 'ool2C2BE7F4xnwkIOhQOT9a3jpZxhQrXcgPDSc7pyiH8WZ8yE9',
        },
      });

      setDiseaseInfo(response.data);
    } catch (error) {
      console.error('Error detecting disease:', error.response ? error.response.data : error.message);
      setDiseaseInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
      {diseaseInfo && (
        <View style={styles.diseaseInfo}>
          <Text style={styles.title}>Detected Diseases:</Text>
          {diseaseInfo.suggestions && diseaseInfo.suggestions.length > 0 ? (
            diseaseInfo.suggestions.map((suggestion, index) => (
              <Text key={index} style={styles.diseaseText}>{suggestion.disease.name}</Text>
            ))
          ) : (
            <Text style={styles.diseaseText}>No diseases detected</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
    borderRadius: 10,
  },
  loading: {
    marginTop: 16,
  },
  diseaseInfo: {
    marginTop: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  diseaseText: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
