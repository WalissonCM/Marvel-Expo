import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState} from 'react'
import Api from '../../services/Api'
import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'

export default function PersonagensDetalhes({route}) {

  const [details, setDetails] = useState([])
  const [comics, setComics] = useState([])

  useEffect(() => {
    const id = route.params.id;
    Api.get(`characters/${id}`)
      .then(response => {
        setDetails(response.data.data.results);
      })
  }, [])

  useEffect(() => {
    const id = route.params.id;
    Api.get(`characters/${id}/comics`)
      .then(response => {
        setComics(response.data.data.results);
      })
  })
  
  return (
    <ScrollView>
      {details.map(detail => (
        <View style={{backgroundColor: 'black'}} key={detail.id}>
          <Image style={{width: 360, height: 300}} source={{uri: detail.thumbnail.path + '.' + detail.thumbnail.extension}}/>
          <Text style={{fontSize: 40, margin: 10, color: 'white'}}>{detail.name}</Text> 
        </View>
      ))}
     {comics.map(comic => (
      <View style={{backgroundColor: 'black'}} key={comic.id}>
        <Card style={styles.card}>
          <Card.Cover style={{width: 100, height: 150, borderRadius: -10}} source={{uri: comic.thumbnail.path + '.' + comic.thumbnail.extension}}/>
          <Card.Content> 
          </Card.Content>
        </Card>
        </View>
     ))}
    </ScrollView>

  )
}

const styles = StyleSheet.create({
 
  card  : {
    flexDirection: 'row',
    gap: 10,
    width: 100,
  
}

})