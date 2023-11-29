import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState} from 'react'
import Api from '../../services/Api'
import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'


export default function QuadrinhosDetalhes({route}) {

  const [details, setDetails] = useState([])

  useEffect(() => {
    const id = route.params.id
    Api.get (`comics/${id}`)
    .then(response => {
      setDetails(response.data.data.results)
    })
  }, [])
 
  
  
  return (
    <View>
      <Image source={{uri: quadrinhos.thumbnail.path + '.' + quadrinhos.thumbnail.extension}}/>
      <Text style={styles.text}>{quadrinhos.name}dswdwad</Text>
    </View>
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