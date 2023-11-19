import { ScrollView, View, StyleSheet} from 'react-native'
import { Card, Text } from 'react-native-paper'
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
    <View style={{ flex: 1 , backgroundColor: 'red' }}>
      <Text style={styles.text}>Quadrinhos</Text>
      <ScrollView>
      <View style={styles.container}>
      
      {quadrinhos.map(item => (
        <Card
        key={item.id}
        style={styles.card}
      >
        <Card.Cover style={{width: 100, height: 100}} source={{uri: item.thumbnail.path + '.' + item.thumbnail.extension}} />
        <Card.Content>
          <Text>{item.title}</Text>
        </Card.Content>
      </Card>
    ))}
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent : 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    marginTop: 20
  },
  text: {
    fontSize: 20, 
    textAlign: 'center', 
    marginBottom: 10,
    marginTop: 50, 
    color: 'white'
  },
  card: {
    marginBottom: 90, 
    width: 100, 
    height: 50, 
    margin: 5 
  }
  
})

