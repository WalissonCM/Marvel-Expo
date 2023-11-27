import { View, StyleSheet, FlatList } from 'react-native'
import { ActivityIndicator, Card, Searchbar, Text } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import Api from '../../services/Api'
import { useFonts } from 'expo-font'

export default function Quadrinhos({ navigation }) {

  const [fontsLoaded] = useFonts({
    'Adventure': require('../../assets/fonts/Adventure.otf'),
  })

    const [quadrinhos, setQuadrinhos] = useState([])
    const [offset, setOffset] = useState(100)
    const [loading, setLoading] = useState(false)
    
    const img_default = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    
    // loading = false
    
    useEffect(() => {
      loadData()
    }, [])
    
    const loadData = () => {
      // setLoading(true)
      Api.get('comics')
      .then(response => {
        const respostaQuadrinhos = response.data.data.results
        const quadrinhosFiltrados = respostaQuadrinhos.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
        setQuadrinhos(quadrinhosFiltrados)
          // setLoading(false)
        })
    }

    const loadMoreData = () => {
      setLoading(true)
      Api.get('comics?offset=' + offset)
        .then(response => {
          const respostaQuadrinhos = response.data.data.results
          const quadrinhosFiltrados = respostaQuadrinhos.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
          setQuadrinhos([...quadrinhos, ...quadrinhosFiltrados])
          setOffset(offset + 100)
          setLoading(false)
  
        })
    }

    const [pesquisar, setPesquisar] = useState('')
    const handlePesquisar = () => {
        Api.get(`comics?titleStartsWith=${pesquisar}`)
        .then(response => {
          const respostaQuadrinhos = response.data.data.results
        const quadrinhosFiltrados = respostaQuadrinhos.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
          setQuadrinhos(quadrinhosFiltrados)
        })
    }

    
  return (
    <View style={{ flex: 1 , backgroundColor: '#700f14' }}>
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
      
      <FlatList style={styles.container}
        data={quadrinhos}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        onEndReached={loadMoreData}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
        ListFooterComponent={loading  && <ActivityIndicator theme={{ colors: { primary: 'red' } }} style={{ backgroundColor: '#fff', marginBottom: 10}} animating={true} />}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => (
        <Card 
        key={item.id}
        style={styles.card}
        mode="contained"
        onPress={() => navigation.push('quadrinhos-detalhes', {id: item.id})}
      >
       <Card.Cover style={{width: 100, height: 150, borderRadius: -10}} source={{uri: item.thumbnail.path + '.' + item.thumbnail.extension}} />
        <Card.Content>
          <Text style={{marginTop: 5}}>{item.title}</Text>
        </Card.Content>
       </Card>
        )}>
      </FlatList>
    
</View> 
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  viewContainer:{
    backgroundColor: '#fff',
    marginEnd: 10,
  },
  text: {
    fontFamily: 'Adventure',
    fontSize: 30, 
    textAlign: 'center', 
    marginBottom: 10,
    marginTop: 50, 
    color: 'white'
  },
  card: {
    marginBottom: 120,
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: -10,
  },
  search: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'black',
  }
  
})





