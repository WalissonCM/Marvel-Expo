import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'

export default function Login() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ee171f'}}>
        <Animated.Image resizeMode={'contain'} source={require('../assets/marvel.png')} style={{width: '100%', height: '100%'}} />
    </View>

  )
}

const styles = StyleSheet.create({})