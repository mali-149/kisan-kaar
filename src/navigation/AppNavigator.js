import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import Splash from '../screens/Splash'
import React, { useEffect, useState } from 'react'
import LoginPage from '../screens/LoginPage'
import SignupPage from '../screens/SignupPage'
import OnBoarding from '../screens/OnBoarding'
import { getItem } from '../utilis/AsyncStorage'
import WeatherComponent from '../components/WeatherComponent'
import DrawerNavigation from '../components/DrawerNavigation'
import EditProfile from '../screens/EditProfile'
import SocialMedia from '../components/SocialMedia'
import MarketRates from '../screens/MarketRates'
import SellProduce from '../screens/SellProduce'
import Wheat from '../screens/Wheat'
import Rice from '../screens/Rice'
import Cotton from '../screens/Cotton'
import SugarCane from '../screens/SugarCane'
import Corn from '../screens/Corn'
import PlaceOrder from '../screens/PlaceOrder'
import MyOrders from '../screens/MyOrders'
import Favourites from '../screens/Favourites'
import ForgetPassword from '../screens/ForgetPassword'
import Community from '../screens/Community'
import CropDetails from '../screens/CropDetails'


const Stack = createNativeStackNavigator()


const AppNavigator = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkifAlreadyOnboarded();
  }, [])
  const checkifAlreadyOnboarded =  async async => {
    let Onboarded = await getItem('onboarded');
    if (Onboarded == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  }
  if (showOnboarding == null) {
    return null;
  }
  if (showOnboarding) {
    return (
      <Stack.Navigator initialRouteName='OnBoarding' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={Splash}></Stack.Screen>
        <Stack.Screen name='Login' component={LoginPage}></Stack.Screen>
        <Stack.Screen name='SignUp' component={SignupPage}></Stack.Screen>
        <Stack.Screen name='Home' component={Home}></Stack.Screen>
        <Stack.Screen name='OnBoarding' component={OnBoarding}></Stack.Screen>
        <Stack.Screen name='Weather' component={WeatherComponent}></Stack.Screen>
        <Stack.Screen name='Drawer' component={DrawerNavigation}></Stack.Screen>
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="SocialMedia" component={SocialMedia} />
        <Stack.Screen name="MarketRates" component={MarketRates} />
        <Stack.Screen name="SellProduce" component={SellProduce} />
        <Stack.Screen name="Wheat" component={Wheat} />
        <Stack.Screen name="Rice" component={Rice} />
        <Stack.Screen name="Cotton" component={Cotton} />
        <Stack.Screen name="Sugar Cane" component={SugarCane} />
        <Stack.Screen name="Corn" component={Corn} />
        <Stack.Screen name="Order" component={PlaceOrder} />
        <Stack.Screen name="MyOrder" component={MyOrders} />
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="Reset" component={ForgetPassword} />
        <Stack.Screen name="Chat" component={Community} />
        <Stack.Screen name="CropDetails" component={CropDetails} />

      </Stack.Navigator>
    )
  }else{
    return (
      <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={Splash}></Stack.Screen>
        <Stack.Screen name='Login' component={LoginPage}></Stack.Screen>
        <Stack.Screen name='SignUp' component={SignupPage}></Stack.Screen>
        <Stack.Screen name='Home' component={Home}></Stack.Screen>
        <Stack.Screen name='OnBoarding' component={OnBoarding}></Stack.Screen>
        <Stack.Screen name='Weather' component={WeatherComponent}></Stack.Screen>
        <Stack.Screen name='Drawer' component={DrawerNavigation}></Stack.Screen>
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="SocialMedia" component={SocialMedia} />
        <Stack.Screen name="MarketRates" component={MarketRates} />
        <Stack.Screen name="SellProduce" component={SellProduce} />
        <Stack.Screen name="Wheat" component={Wheat} />
        <Stack.Screen name="Rice" component={Rice} />
        <Stack.Screen name="Cotton" component={Cotton} />
        <Stack.Screen name="Sugar Cane" component={SugarCane} />
        <Stack.Screen name="Corn" component={Corn} />
        <Stack.Screen name="Order" component={PlaceOrder} />
        <Stack.Screen name="MyOrder" component={MyOrders} />
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="Reset" component={ForgetPassword} />
        <Stack.Screen name="Chat" component={Community} />
        <Stack.Screen name="CropDetails" component={CropDetails} />
      </Stack.Navigator>
    )
  }

}

export default AppNavigator