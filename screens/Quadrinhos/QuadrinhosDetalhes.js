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
    Api.get (`comics/${id}/creators`)
    .then(response => {
      setEvents(response.data.data.results)
    }) 
}, [])
    
 
  return (
    <ScrollView style={{backgroundColor:'black'}}>
      {details.map(detail => (
      <View  key={detail.id}>
        <Image style={{width: 360, height: 300}} source={{uri: detail.thumbnail.path + '.' + detail.thumbnail.extension}}/>
        <Text style={{fontSize: 30, margin: 10, color: 'white'}}>{detail.title}</Text>
        <Text style={{fontSize: 20, margin: 10, color: 'white'}}>{detail.description}</Text>
        <Text style={{ color: 'red', fontSize: 25, marginTop: 50 , color: 'white', textAlign:'center' }}>Eventos</Text>
      </View>
    ))}
    <View style={styles.comicsContainer}>
    {events.map(event => (
        <Card style={styles.card} key={event.id} >
          <Card.Cover style={{width: 100, height: 150, borderRadius: -10}} source={{uri: event.thumbnail.path + '.' + event.thumbnail.extension}}/>
          <Card.Content>
            <Text style={{color:'white'}} >{event.fullName}</Text> 
          </Card.Content>
        </Card> 
     ))}
     </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  comicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    padding: 10,
    
  },
  card: {
    width: 100,
    height: 150,
    marginBottom: 70,
    
  },
});
