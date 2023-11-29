import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState} from 'react'
import Api from '../../services/Api'
import { Card } from 'react-native-paper'


export default function QuadrinhosDetalhes({route}) {

  const [details, setDetails] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const id = route.params.id
     Api.get (`comics/${id}`)
    .then(response => {
      setDetails(response.data.data.results)
    })
}, [])
   

  useEffect(() => {
    const id = route.params.id
    Api.get (`comics/${id}/events`)
    .then(response => {
      setEvents(response.data.data.results)
    }) 
}, [])
    
 
  return (
    <ScrollView style={{padding: 10}}>
      {details.map(detail => (
      <View style={{backgroundColor: 'black'}} key={detail.id}>
        <Image style={{width: 360, height: 300}} source={{uri: detail.thumbnail.path + '.' + detail.thumbnail.extension}}/>
        <Text style={{fontSize: 40, margin: 10, color: 'white'}}>{detail.title}</Text> 
      </View>
    ))}
    {events.map(event => (
      <View style={{backgroundColor: 'black'}} key={event.id}>
        <Card style={styles.card}>
          <Card.Cover style={{width: 100, height: 150, borderRadius: -10}} source={{uri: event.thumbnail.path + '.' + event.thumbnail.extension}}/>
          <Card.Content> 
          </Card.Content>
        </Card>
        </View>
     ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 10,
    width: 100,
  }
})