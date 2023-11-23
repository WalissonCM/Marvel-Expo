import { ScrollView, View, StyleSheet, FlatList } from 'react-native'
import { Card, Searchbar, Text } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import Api from '../services/Api'

export default function Quadrinhos() {

    const [quadrinhos, setQuadrinhos] = useState([])
    const [offset, setOffset] = useState(20)
    
    const img_default = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    
    // loading = false
    
    useEffect(() => {
      loadData()
    }, [])
    
    const loadData = () => {
      // setLoading(true)
      Api.get('comics')
      .then(response => {
        const respostaPersonagens = response.data.data.results
        const personagensFiltrados = respostaPersonagens.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
        setQuadrinhos(personagensFiltrados)
          // setLoading(false)
        })
    }

    const [pesquisar, setPesquisar] = useState('')
    const handlePesquisar = () => {
        Api.get(`comics?titleStartsWith=${pesquisar}`)
        .then(response => {
          const respostaPersonagens = response.data.data.results
        const personagensFiltrados = respostaPersonagens.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
          setQuadrinhos(personagensFiltrados)
        })
    }

    
  return (
    <View style={{ flex: 1 , backgroundColor: 'red' }}>
          <Text style={styles.text}>Quadrinhos</Text>
          <Searchbar style={styles.search} 
                 theme={{colors:{ primary: 'white'}}} 
                 iconColor="white"
                 placeholder="Pesquisar" 
                 placeholderTextColor="white" 
                 inputStyle={{color: 'white'}} 
                 onChangeText={value => setPesquisar(value)} 
                 value={pesquisar} 
                 onIconPress={handlePesquisar}
                 onSubmitEditing={handlePesquisar}
                 onClearIconPress={() => {
                  setPesquisar('');
                  loadData();
                 }}
                 />
      
    <ScrollView>
      <View style={styles.container}>
      
      <FlatList
        data={quadrinhos}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => (
        <Card 
        key={item.id}
        style={styles.card}
        mode="contained"
      >
       <Card.Cover style={{width: 100, height: 150, borderRadius: -10}} source={{uri: item.thumbnail.path + '.' + item.thumbnail.extension}} />
        <Card.Content>
          <Text style={{marginTop: 5}}>{item.title}</Text>
        </Card.Content>
       </Card>
        )}>
      </FlatList>
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
    marginBottom: 150, 
    width: 100, 
    height: 120, 
    margin: 5,
    borderRadius: 100
  },
  search: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'black',
  }
  
})





