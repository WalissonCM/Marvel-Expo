import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState} from 'react'
import Api from '../../services/Api'

export default function PersonagensDetalhes({route}) {

  const [personagens, setPersonagens] = useState({})
  
  useEffect(() => {
    const id = route.params.id
    Api.get(`characters/${id}`)
      .then(response => {
        setPersonagens(response.data.data.results)
      })
    })
  
  console.log(personagens)
  
  return (
    <View>
      <Image source={{uri: personagens.thumbnail.path + '.' + personagens.thumbnail.extension}}/>
      <Text style={styles.text}>{personagens.name}dfesfsef</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20, 
    
  }
})