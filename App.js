import React, { Component } from 'react';
import { View } from 'react-native';
import Navigation from './src/route/Navigation';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Navigation />
    </View>
  );
}