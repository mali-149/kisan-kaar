import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SellProduce = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const userId = auth().currentUser.uid;
      try {
        const cropsSnapshot = await firestore().collection('SellData').where('userId', '==', userId).get();
        const pesticidesSnapshot = await firestore().collection('pesticides').where('userId', '==', userId).get();
        const fetchedSubmissions = [];

        cropsSnapshot.forEach(doc => {
          fetchedSubmissions.push({ id: doc.id, ...doc.data() });
        });

        pesticidesSnapshot.forEach(doc => {
          fetchedSubmissions.push({ id: doc.id, ...doc.data() });
        });

        setSubmissions(fetchedSubmissions);
      } catch (error) {
        console.error('Error fetching submissions: ', error);
        Alert.alert('Error', 'Failed to fetch submissions');
      }
    };

    fetchSubmissions();
  }, []);

  const options = [
    { label: 'Select Crop', value: 'crops' },
    { label: 'Select Pesticides', value: 'pesticides' },
  ];

  const crops = [
    { label: 'Wheat', value: 'wheat' },
    { label: 'Corn', value: 'corn' },
    { label: 'Rice', value: 'rice' },
    { label: 'Cotton', value: 'cotton' },
    { label: 'Sugar Cane', value: 'sugar cane' },
  ];

  const pesticides = [
    { label: 'Antracol Bayer Propineb', value: 'Antracol Bayer Propineb' },
    { label: 'Roundup 1L Bayer Glyphosate', value: 'Roundup 1L Bayer Glyphosate' },
    { label: 'Regent Bayer Fipronil', value: 'Regent Bayer Fipronil' },
    { label: 'Virtako 40wg', value: 'Virtako 40wg' },
    { label: 'Full Control 50WP', value: 'Full Control 50WP' },
  ];

  const handleSubmit = async () => {
    if (!selectedItem || !quantity || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const userId = auth().currentUser.uid;

    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) {
        Alert.alert('Error', 'User not found');
        return;
      }
      const userData = userDoc.data();

      const newSubmission = {
        itemType: selectedOption,
        itemName: selectedItem,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        userId: userId,
        userName: userData.name,
        userContact: userData.phoneNumber,
        timestamp: new Date().toISOString(),
      };

      const collectionName = selectedOption === 'crops' ? 'SellData' : 'pesticides';
      const docRef = await firestore().collection(collectionName).add(newSubmission);
      newSubmission.id = docRef.id;
      setSubmissions([...submissions, newSubmission]);
      Alert.alert('Success', 'Submission added successfully');
    } catch (error) {
      console.error('Error during submission: ', error);
      Alert.alert('Error', 'Failed to process submission');
    }
  };

  const handleDelete = async (id, itemType) => {
    const collectionName = itemType === 'crops' ? 'SellData' : 'pesticides';
    try {
      await firestore().collection(collectionName).doc(id).delete();
      setSubmissions(submissions.filter(item => item.id !== id));
      Alert.alert('Success', 'Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item: ', error);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  const getItems = () => {
    return selectedOption === 'crops' ? crops : pesticides;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sell Your Yield</Text>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => {
          setSelectedOption(itemValue);
          setSelectedItem('');
        }}
        style={styles.picker}
        dropdownIconColor={'black'}
        mode="dropdown"
      >
        <Picker.Item label="Select Option" value="" />
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
      {selectedOption && (
        <Picker
          selectedValue={selectedItem}
          onValueChange={(itemValue) => setSelectedItem(itemValue)}
          style={styles.picker}
          dropdownIconColor={'black'}
          mode="dropdown"
        >
          <Picker.Item label={`Select ${selectedOption === 'crops' ? 'Crop' : 'Pesticide'}`} value="" />
          {getItems().map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      )}
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        placeholderTextColor={'black'}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        placeholderTextColor={'black'}
        onChangeText={setPrice}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.submit}>Submit</Text>
      </TouchableOpacity>
      <FlatList
        data={submissions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.itemType === 'crops' ? 'Crop' : 'Pesticide'}: {item.itemName}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: {item.price}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id, item.itemType)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 25,
    marginBottom: 20,
    fontFamily: 'WorkSans-Black',
    color: '#1E3D15',
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    color: '#1E3D15',
    borderRadius: 10,
    fontFamily: 'WorkSans-Light',
    borderColor: '#1E3D15',
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
    fontFamily: 'WorkSans-Light',
  },
  button: {
    marginTop: 40,
    alignSelf: 'center',
    backgroundColor: '#1E3D15',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  submit: {
    fontFamily: 'WorkSans-Light',
    color: '#FFFFFF',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SellProduce;
