import {View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import Api from '../services/Api'


export default function Quiz() {

    const [quiz, setQuiz] = useState([])

    useEffect(() => {
        Api.get('characters')
        .then(response => {
          setQuiz(response.data.data.results)
        })
    }, [])
  

    
  return (
 
  <View style={{ flex: 1 , backgroundColor: 'white' }}>
        <Text style={styles.text}>Sera que voçe sabe tudo sobre o universo de MARVEL?</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  }
})
