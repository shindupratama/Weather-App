import React, { Component } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View, StatusBar } from 'react-native';

const {height, width} = Dimensions.get('window');

export default class Splash extends Component {
    state = {
        logoOpacity: new Animated.Value(0),
        titleMarginTop: new Animated.Value(height / 2)
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.logoOpacity, {
                toValue: 1,
                duration: 2000
            }),
            Animated.timing(this.state.titleMarginTop, {
                toValue: 10,
                duration: 1500
            })
        ]).start();
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bf360c'}}>
                <StatusBar barStyle="dark-content" backgroundColor="#bf360c" />
                <Animated.Image
                    style={{height: 200, width: 200, opacity: this.state.logoOpacity}}
                    source={require('../images/cloud.png')}
                />
                <Animated.Text style={{...style.title, marginTop: this.state.titleMarginTop}}>Weather App</Animated.Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    title: {
        marginTop: 10, textAlign: 'center', width: 300, fontSize: 28, fontWeight: 'bold', color: '#fff'
    }
})