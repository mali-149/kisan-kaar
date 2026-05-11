import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'; 
import auth from '@react-native-firebase/auth';

const PlaceOrder = ({ route, navigation }) => {
  const { item } = route.params;
  const [orderQuantity, setOrderQuantity] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [comments, setComments] = useState('');
  
  const handleConfirmOrder = async () => {
    console.log("handleConfirmOrder triggered"); 
  
    if (!orderQuantity || !deliveryAddress) {
      Alert.alert('Error', 'Please fill in all the required fields');
      console.log("Missing required fields", {orderQuantity, deliveryAddress}); 
      return;
    }
    
    if (parseInt(orderQuantity) > item.quantity) {
      Alert.alert('Error', 'Order quantity exceeds available quantity');
      console.log("Order quantity exceeds available quantity", {orderQuantity, itemQuantity: item.quantity});
      return;
    }
    
    const userId = auth().currentUser?.uid; 
    if (!userId) {
      Alert.alert('Error', 'User not logged in');
      console.log("User not logged in"); 
      return;
    }
  
    console.log("Order details:", {
      userId,
      itemName: item.itemName,
      orderQuantity,
      deliveryAddress,
      comments: comments || "", 
      price: item.price,
      sellerId: item.userId,
      orderDate: firestore.Timestamp.fromDate(new Date())
    });
    
    try {
      await firestore().collection('orders').add({
        userId,
        itemName: item.itemName,
        orderQuantity,
        deliveryAddress,
        comments: comments || "", 
        price: item.price,
        sellerId: item.userId,
        orderDate: firestore.Timestamp.fromDate(new Date()), 
      });
      Alert.alert('Success', `Order placed for ${item.itemName}`);
      navigation.goBack();
    } catch (error) {
      console.error('Error placing order: ', error);
      Alert.alert('Error', 'Failed to place order');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Place Order</Text>
      <Text style={styles.label}>Item: {item.itemName || item.itemName}</Text>
      <Text style={styles.label}>Price: {item.price}</Text>
      <Text style={styles.label}>Available Quantity: {item.quantity}</Text>
      <Text style={styles.label}>Seller: {item.userName}</Text>
      <Text style={styles.label}>Contact: {item.userContact}</Text>

      <TextInput
        style={styles.input}
        placeholder="Order Quantity"
        placeholderTextColor={'black'}
        keyboardType="numeric"
        value={orderQuantity}
        onChangeText={setOrderQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Delivery Address"
        value={deliveryAddress}
        placeholderTextColor={'black'}
        onChangeText={setDeliveryAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Additional Comments"
        value={comments}
        placeholderTextColor={'black'}
        onChangeText={setComments}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 25,
    marginBottom: 20,
    fontFamily: 'WorkSans-Black',
    color: '#1E3D15',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'WorkSans-Light',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#1E3D15',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontFamily: 'WorkSans-Light',
    color: 'black',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E3D15',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width:'50%',alignItems:'center',alignContent:'center',alignSelf:'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'WorkSans-Light',
  },
});

export default PlaceOrder;
