import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState} from 'react'
import Api from '../../services/Api'
import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'


export default function QuadrinhosDetalhes({route}) {

  const [details, setDetails] = useState([])

  useEffect(() => {
    const id = route.params.id
    setTimeout(() => {
     Api.get (`comics/${id}`)
    .then(response => {
      setDetails(response.data.data.results)
    })
    }, [])  
} , 1000)
   

  useEffect(() => {
    const id = route.params.id
    setTimeout(() => {
    Api.get (`comics/${id}/characters`)
    .then(response => {
      setDetails(response.data.data.results)
    })
    }, [])  
} , 1000)
    
 
  
  
  return (
    <ScrollView>
      {details.map(detail => (
      <View style={{backgroundColor: 'black'}} key={detail.id}>
        <Image style={{width: 360, height: 300}} source={{uri: detail.thumbnail.path + '.' + detail.thumbnail.extension}}/>
        <Text style={{fontSize: 40, margin: 10, color: 'white'}}>{detail.title}</Text> 
      </View>
    ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50
  }
})