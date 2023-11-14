import { Image, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from './services/Api'

export default function Personagens() {

    const [personagens, setPersonagens] = useState([])

    useEffect(() => {
        Api.get('characters')
        .then(response => {
            setPersonagens(response.data.data.results)
        })
    }, [])
    console.log(personagens)

    
  return (
    <View>
      <Text style={{fontSize: 20, textAlign: 'center', marginTop: 50}}>Personagens</Text>
      <ScrollView>
      {personagens.map(item => (
        <Image key={item.id} source={{uri: item.thumbnail.path + '.' + item.thumbnail.extension}} style={{width: 200, height: 200, margin: 10}}/>
      ))}
      </ScrollView>
    </View>
  )
}

