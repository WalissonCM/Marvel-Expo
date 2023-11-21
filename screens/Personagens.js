import { ScrollView, View, StyleSheet } from 'react-native'
import { Card, Searchbar, Text } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import Api from '../services/Api'


export default function Personagens() {

    const [personagens, setPersonagens] = useState([])

    useEffect(() => {
        Api.get('characters')
        .then(response => {
            setPersonagens(response.data.data.results)
        })
    }, [])
    console.log(personagens)

    const [pesquisar, setPesquisar] = useState('')
     
    const handlePesquisar = () => {
        Api.get(`characters?name=${pesquisar}`)
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
                 iconColor="white" rippleColor={"white"}
                 placeholder="Pesquisar" 
                 placeholderTextColor="white" 
                 inputStyle={{color: 'white'}} 
                 onChangeText={setPesquisar} 
                 value={pesquisar} 
                 onIconPress={handlePesquisar}/>
    
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
      >
       <Card.Cover style={{width: 100, height: 100}}  source={{uri: item.thumbnail.path + '.' + item.thumbnail.extension}}/>
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
    height: 50, 
    margin: 5 
  },
  search: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'black',
  }
  
})



