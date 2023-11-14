import { Image, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from './services/Api'

export default function Quadrinhos() {

    const [quadrinhos, setQuadrinhos] = useState([])

    useEffect(() => {
        Api.get('comics')
        .then(response => {
            setQuadrinhos(response.data.data.results)
        })
    }, [])
    console.log(quadrinhos)

    
  return (
    <View>
      <Text style={{fontSize: 20, textAlign: 'center', marginTop: 50}}>Quadrinhos</Text>
      <ScrollView>
      {quadrinhos.map(item => (
        <Image key={item.id} source={{uri: item.thumbnail.path + '.' + item.thumbnail.extension}} style={{width: 200, height: 200, margin: 10}}/>
      ))}
      </ScrollView>
    </View>
  )
}

