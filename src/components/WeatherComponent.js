import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, ScrollView } from 'react-native';
import axios from 'axios';
import { API_KEY } from './Key';
import Geolocation from 'react-native-geolocation-service';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Weather App Location Permission",
          message: "This app needs access to your location to show local weather data.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
        setLocationStatus('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
      setLocationStatus('Error requesting location permissions');
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherAndForecastData(latitude, longitude);
      },
      error => {
        console.log(error.message);
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchWeatherAndForecastData = async (latitude, longitude) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    try {
      const weatherResponse = await axios.get(weatherUrl);
      setWeatherData(weatherResponse.data);
      const forecastResponse = await axios.get(forecastUrl);
      setForecastData(processForecastData(forecastResponse.data.list));
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLocationStatus('Failed to fetch data');
    }
  };

  const processForecastData = (forecastList) => {
    return forecastList.filter((item, index) => index % 8 === 0);
  };

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  if (!weatherData || !forecastData.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading data...</Text>
        {locationStatus ? <Text style={styles.errorText}>{locationStatus}</Text> : null}
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.currentWeatherContainer}>
        <Text style={styles.cityText}>{weatherData.name}</Text>
        <Text style={styles.temperatureText}>{weatherData.main.temp.toFixed(0)}°C</Text>
        <Text style={styles.weatherConditionText}>{weatherData.weather[0].main}</Text>
        <Text style={styles.detailsText}>Humidity: {weatherData.main.humidity}%</Text>
        <Text style={styles.detailsText}>Wind: {weatherData.wind.speed} m/s</Text>
      </View>
      <Text style={styles.forecastHeader}>Weather Forecast</Text>
      <ScrollView horizontal style={styles.forecastContainer}>
        {forecastData.map((item, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.forecastDayText}>{index === 0 ? 'Today' : getDayName(item.dt)}</Text>
            <Text style={styles.forecastText}>Temp: {item.main.temp.toFixed(0)}°C</Text>
            <Text style={styles.forecastText}>Weather: {item.weather[0].main}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default WeatherComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1D1B27',
  },
  loadingText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 20
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  },
  currentWeatherContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  cityText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 64,
    color: 'white',
    fontWeight: 'bold',
  },
  weatherConditionText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 18,
    color: 'white',
  },
  forecastHeader: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  forecastContainer: {
    flexDirection: 'row',
  },
  forecastItem: {
    backgroundColor: '#252839',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    width: 120,
    alignItems: 'center',
  },
  forecastDayText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  forecastText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },
});
