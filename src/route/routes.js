import React from 'react';
import Splash from '../screens/Splash';
import Weather from '../screens/Weather';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SplashStack = createStackNavigator();
const WeatherStack = createStackNavigator();

export const isMountedRef = React.createRef();
export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// All StackNavigator goes here :

export const SplashStackScreen = () => {
  return (
    <SplashStack.Navigator headerMode="none">
      <SplashStack.Screen name="Splash" component={Splash} />
    </SplashStack.Navigator>
  );
}

export const WeatherStackScreen = () => {
  return (
    <WeatherStack.Navigator headerMode="none">
      <WeatherStack.Screen name="Weather" component={Weather} />
    </WeatherStack.Navigator>
  );
}