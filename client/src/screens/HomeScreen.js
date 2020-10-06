import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Post from '../components/Post';
//import Card from '../components/Card';

export default function HomeScreen() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('https://europe-west1-eolas-90876.cloudfunctions.net/api/posts')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  let recentPosts = data ? (
    data.map((post) => <Post key={post.postId} post={post} />)
  ) : (
    <ActivityIndicator
      style={styles.activityIndicator}
      size="large"
      color="#00ff00"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>{recentPosts}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/*  <SafeAreaView style={styles.container}>
   <FlatList
     data={data}
     //extraData={selected} //for re-render the Flatlist data item
     renderItem={({item}) => (
       <TouchableOpacity>
         <Card>
           <Text>{item.body}</Text>
         </Card>
       </TouchableOpacity>
     )}
     keyExtractor={(item) => item.postId}
   />
 </SafeAreaView> */
