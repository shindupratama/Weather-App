import React, { Component } from 'react';
import { Alert, FlatList, Image, Linking, PermissionsAndroid, Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Api from '../api/Api';

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
      'Location permission denied by user.',
      ToastAndroid.LONG,
    );
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

let dayname;

export default class Weather extends Component {
  state = {
    isLoading: true,
    city: '',
    country: '',
    temperature: 0,
    weather: '',
    weather_description: '',
    icon: '',
    error: '',
    lists: ''
  }

  async componentDidMount() {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
          this.getForecast(position.coords.latitude, position.coords.longitude);
          this.getOneCallApi(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          // See error code charts below.
          console.log('error geolocation', error.code, error.message);
          this.setState({error: 'Error Getting Weather Condtions'});
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  getWeather(lat, lon) {
    let api = new Api();
    api.getWeather(lat, lon)
    .then((response) => { this.setState({temperature: response.data.main.temp, weather: response.data.weather[0].main,
      weather_description: response.data.weather[0].description, icon: response.data.weather[0].icon, isLoading: false}); dayname = new Date(response.data.dt * 1000).toLocaleDateString("en", {weekday: "long"}); })
    .catch((error) => (console.log(error.response)));
  }

  getForecast(lat, lon) {
    let api = new Api();
    api.getForecast(lat, lon)
    .then((response) => {this.setState({
      city: response.data.city.name,
      country: response.data.city.country,
      isLoading: false
    }); })
    .catch((error) => (console.log(error.response)));
  }

  getOneCallApi(lat, lon) {
    let api = new Api();
    api.getOneCallApi(lat, lon)
    .then((response) => {this.setState({lists: response.data.daily})})
    .catch((error) => (console.log(error.response)));
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#bf360c'}}>
        {this.state.isLoading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 24, color: '#fff'}}>Loading...</Text>
        </View> : <View>
        <View style={{marginTop: 15, marginLeft: 10}}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff'}}>{this.state.city}</Text>
          <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff'}}>{dayname}</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>{this.state.weather}</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>{this.state.weather_description}</Text>
          <Text style={{fontSize: 34, fontWeight: 'bold', color: '#fff'}}>{`${this.state.temperature.toFixed(0)}°C`}</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: 250, width: 300}}
            source={{uri: `https://openweathermap.org/img/wn/${this.state.icon}@2x.png`}}
          />
        </View>
        <View style={{marginTop: 15, marginLeft: 10}}>
          {this.state.lists != undefined && <FlatList
            data={this.state.lists.slice(0, 3)}
            renderItem={({ item, index }) => (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 24, color: '#fff'}}>{new Date(item.dt * 1000).toLocaleDateString("en", {weekday: "short"})}</Text>
                <Image
                  style={{height: 40, width: 40}}
                  source={{uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}}
                />
                <Text style={{fontSize: 24, color: '#fff'}}>{`${item.temp.day.toFixed(0)}°C`}</Text>
              </View>
            )}
            keyExtractor={item => item.dt}
          />}
        </View>
        </View>}
      </View>
    );
  }
};