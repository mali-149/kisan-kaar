import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GovRates from '../components/GovRates';
import auth from '@react-native-firebase/auth';

const initialLayout = { width: Dimensions.get('window').width };

const Market = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'crops', title: 'Crops' },
    { key: 'pesticides', title: 'Pesticides' },
  ]);
  const [cropsData, setCropsData] = useState([]);
  const [pesticidesData, setPesticidesData] = useState([]);

  useEffect(() => {
    const fetchCropsData = async () => {
      const snapshot = await firestore().collection('SellData').get();
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCropsData(data);
    };

    const fetchPesticidesData = async () => {
      const snapshot = await firestore().collection('pesticides').get();
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPesticidesData(data);
    };

    fetchCropsData();
    fetchPesticidesData();
  }, []);

  const handleContactPress = (item) => {
    if (!item.userId) {
      Alert.alert('Error', 'User ID is undefined');
      return;
    }
    navigation.navigate('Chat', { userId: item.userId });
    console.log("Navigating to ChatScreen with userId:", item.userId);

  };
  

  const handlePlaceOrder = (item) => {
    navigation.navigate('Order', { item });
  };

  const handleAddToFavourites = async (item) => {
    const userId = auth().currentUser ? auth().currentUser.uid : null;
    if (!userId) {
        Alert.alert('Error', 'User not authenticated');
        return;
    }

    const favouriteItem = {
        ...item,
        userId: userId 
    };

    try {
        await firestore().collection('favourite').add(favouriteItem);
        Alert.alert('Success', 'Item added to favourites');
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to add item to favourites');
    }
};


  const CropsRoute = () => (
    <View style={styles.scene}>
      <Text style={styles.gov}>Government Rates of Crops</Text>
      <GovRates />
      <FlatList
        data={cropsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.txt}>Crop: {item.itemName}</Text>
            <Text style={styles.txt}>Price: {item.price} Per Maund</Text>
            <Text style={styles.txt}>Seller: {item.userName}</Text>
            <Text style={styles.txt}>Contact: {item.userContact}</Text>
            <Text style={styles.txt}>Quantity: {item.quantity} Maunds</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleContactPress(item)}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePlaceOrder(item)}>
                <Ionicons name="cart-outline" size={24} color="#007BFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );

  const PesticidesRoute = () => (
    <View style={styles.scene}>
      <FlatList
        data={pesticidesData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.txt}>Pesticide: {item.itemName}</Text>
            <Text style={styles.txt}>Price: {item.price} Per Unit</Text>
            <Text style={styles.txt}>Seller: {item.userName}</Text>
            <Text style={styles.txt}>Contact: {item.userContact}</Text>
            <Text style={styles.txt}>Quantity: {item.quantity} Units</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleContactPress(item.userId)}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePlaceOrder(item)}>
                <Ionicons name="cart-outline" size={24} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAddToFavourites(item)}>
                <Ionicons name="heart-outline" size={24} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );

  const renderScene = SceneMap({
    crops: CropsRoute,
    pesticides: PesticidesRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#1E3D15' }}
      labelStyle={{ color: 'white', fontFamily: 'WorkSans-Light' }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 10,
    marginBottom: 80,
  },
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
  item: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1DB954',
    padding: 10,
    borderRadius: 10,
  },
  txt: {
    color: 'black',
    fontFamily: 'WorkSans-Light',
  },
  gov: {
    color: 'black',
    fontFamily: 'WorkSans-Bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Market;
