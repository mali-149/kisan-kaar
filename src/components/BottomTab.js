import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Market from '../screens/Market';
import Community from '../screens/Community';
import Info from '../screens/Info';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';
import MyCrops from '../screens/MyCrops';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#deb887', 
        tabBarHideOnKeyboard:true,
        tabBarInactiveTintColor: 'white', 
        
        tabBarStyle: {
          backgroundColor: '#1E3D15',
          position: 'absolute',
          elevation:0,
          bottom:20,
          left:10,
          right:10,
          height:70,
          borderRadius:15,
          ...styles.shadow
          
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily:'WorkSans-Light',
          height:30
        },
      }}
      
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='My Crops'
        component={MyCrops}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='seedling' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Market'
        component={Market}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='cart' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Scan'
        component={Info}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='scan' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  shadow:{
    shadowColor:'#2f4f4f',
    shadowOpacity:0.25,
    shadowRadius:3.5,
    shadowOffset:{
      width:0,
      height:10
    },
    elevation:10
  }
})
