import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

export default function HomeScreen() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('https://europe-west1-eolas-90876.cloudfunctions.net/api/posts')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  let recentPosts = data ? (
    data.map((post) => <Text key={post.postId}>{post.body}</Text>)
  ) : (
    <Text> loading.....</Text>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'red'}}>HOME SCREEN</Text>

      {recentPosts}
    </View>
  );
}
