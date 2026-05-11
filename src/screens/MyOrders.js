import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = auth().currentUser.uid;
      try {
        const ordersSnapshot = await firestore().collection('orders').where('userId', '==', userId).get();
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders: ', error);
        Alert.alert("Error", "Failed to fetch orders from Firestore.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.txt}>Item: {item.item || item.pesticide}</Text>
            <Text style={styles.txt}>Price: {item.price}</Text>
            <Text style={styles.txt}>Quantity: {item.orderQuantity}</Text>
            <Text style={styles.txt}>Order Date: {new Date(item.timestamp).toLocaleString()}</Text>
            <Text style={styles.txt}>Delivery Address: {item.deliveryAddress}</Text>
            <Text style={styles.txt}>Comments: {item.comments}</Text>
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 25,
    marginBottom: 20,
    fontFamily: 'WorkSans-Black',
    color: '#1E3D15',
    textAlign: 'center',
  },
  item: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1E3D15',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  txt: {
    color: 'black',
    fontFamily: 'WorkSans-Light',
    marginBottom: 5,
  },
});

export default MyOrders;
