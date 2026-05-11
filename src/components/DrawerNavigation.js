import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import SettingsScreen from '../screens/SettingsScreen';
import BottomTab from './BottomTab';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/Profile';
import MarketRates from '../screens/MarketRates';
import SellProduce from '../screens/SellProduce';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#1DB954',
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#1DB954',
        drawerLabelStyle: { marginLeft: -25, fontFamily: 'WorkSans-Medium' },
        headerStyle: {
          backgroundColor: '#1E3D15',
        },
        headerTitleStyle: {
          fontFamily: 'WorkSans-Bold',
        },
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
        drawerStyle: {
          backgroundColor: '#1D1B27',
        },
        headerRight: () => (
          <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('MyOrder')}>
              <Ionicons name="bag" size={25} color="#ffffff" style={{ marginRight: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
              <Ionicons name="heart" size={25} color="#ffffff" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name="KisanKaar"
        component={BottomTab}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Crop Calculator"
        component={MarketRates}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="calculator-outline" size={22} color={color} />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Sell Items"
        component={SellProduce}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="cash-outline" size={22} color={color} />
          ),
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
