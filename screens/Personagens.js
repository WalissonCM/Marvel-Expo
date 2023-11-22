import { ScrollView, View, StyleSheet } from 'react-native'
import { Card, Searchbar, Text } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import Api from '../services/Api'



export default function Personagens() {

    const [personagens, setPersonagens] = useState([])
    const img_default = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    // loading = false

    useEffect(() => {
      loadData()
    }, [])

    const loadData = () => {
      // setLoading(true)
      Api.get('characters')
      .then(response => {
        const respostaPersonagens = response.data.data.results
        const personagensFiltrados = respostaPersonagens.filter(p => !(p.thumbnail.path + '.' + p.thumbnail.extension == img_default))
          setPersonagens(personagensFiltrados)
          // setLoading(false)
        }).catch(error => {r
          console.log(error)
          // setLoading(false)
      })
    }


    const [pesquisar, setPesquisar] = useState('')

  
     
    const handlePesquisar = () => {
        Api.get(`characters?nameStartsWith=${pesquisar}`)
        .then(response => {
            setPersonagens(response.data.data.results)
        })
    }

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

  {/*  useEffect(() => {
      setLoading(true);
      Api.get(`characters?offset=${page * 100}`)
        .then((response) => response.json())
        .then((json) => setData(json.data.results))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    })
    */}         


  return (
 
    <View style={{ flex: 1 , backgroundColor: 'red' }}>
      <Text style={styles.text}>Personagens</Text>
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
   {/*  data={data}
    numColumns={2}
    onEndReached={() => setPage(page + 1)}
    onEndReachedThreshold={0.1}
    refreshing={loading}
    onRefresh={() => setPage(1)}
    >   
    */}  
      <View style={styles.container}>
      
      {personagens.map(item => (
        <Card 
        key={item.id}
        style={styles.card}
        mode="contained"
      >
       <Card.Cover style={{width: 100, height: 150, borderRadius: -10}} source={{uri: item.thumbnail.path + '.' + item.thumbnail.extension}} />
        <Card.Content>
          <Text>{item.name}</Text>
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
    height: 100, 
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



