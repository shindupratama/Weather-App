import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Splash from '../screens/Splash';
import Weather from '../screens/Weather';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const WeatherStack = createStackNavigator();
const AppStack = createStackNavigator();

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showSplash: false
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 4000)
  }

  setTimePassed = () => {
    this.setState({showSplash: true})
  }

  render() {
    if(!this.state.showSplash) {
      return <Splash/>;
    }
    
    return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#bf360c" />
        <WeatherStack.Navigator screenOptions={{ headerShown: false }}>
          <WeatherStack.Screen name="Weather" component={Weather} />
        </WeatherStack.Navigator>
      </NavigationContainer>
    );
  };
}
  
export default Navigation;