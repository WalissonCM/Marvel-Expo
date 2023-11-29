import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Api from '../../services/Api';
import { Card } from 'react-native-paper';

export default function PersonagensDetalhes({ route }) {
  const [details, setDetails] = useState([]);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const id = route.params.id;
    Api.get(`characters/${id}`).then(response => {
      setDetails(response.data.data.results);
    });
  }, []);

  useEffect(() => {
    const id = route.params.id;
    Api.get(`characters/${id}/comics`).then(response => {
      setComics(response.data.data.results);
    });
  }, []);

  return (
    <ScrollView style={{backgroundColor:'black'}}>
      {details.map(detail => (
        <View key={detail.id}>
          <Image
            style={{ width: 360, height: 300 }}
            source={{ uri: detail.thumbnail.path + '.' + detail.thumbnail.extension }}
          />
          <Text style={{ fontSize: 40, margin: 10, color: 'white' }}>{detail.name}</Text>
          <Text style={{ fontSize: 20, margin: 10, color: 'white' }}>{detail.description}</Text>
          <Text style={{ color: 'red', fontSize: 25,marginTop:20, marginBottom: 50 , color: 'white', textAlign:'center' }}>Quadrinhos</Text>
        </View>
      ))}

      <View style={styles.comicsContainer}>
        {comics.map(comic => (
          <Card style={styles.card} key={comic.id}>
            <Card.Cover
              style={{ width: 100, height: 150, borderRadius: -10 }}
              source={{ uri: comic.thumbnail.path + '.' + comic.thumbnail.extension }}
            />
            <Card.Content>
              <Text style={{color:'white'}} >{comic.title}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  comicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    backgroundColor:'black'
  },
  card: {
    width: 100,
    height: 150,
    marginBottom: 70,
    
  },
});
