import React, {Component} from 'react';
import {Image, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
        postId,
      },
    } = this.props;
    return (
      <Container>
        <Content>
          <Card style={styles.card}>
            <CardItem style={styles.cardBackground}>
              <Left>
                <Thumbnail style={styles.thumbNail} source={userImage} />
                <Body>
                  <Text
                    style={{
                      color: '#14c6de',
                    }}
                    onPress={() => Linking.openURL(`/users/${userHandle}`)}>
                    {userHandle}
                  </Text>
                  <Text note>{postId}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody style={styles.cardBackground}>
              {/* <Image
                source={{uri: 'Image URL'}}
                style={{height: 200, width: null, flex: 1}}
              /> */}
              <Text>{body}</Text>
            </CardItem>

            <CardItem style={styles.cardBackgrounddd}>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>{likeCount}</Text>
                </Button>
              </Left>
              <Left>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>{commentCount}</Text>
                </Button>
              </Left>
              <Right>
                <Text>{dayjs(createdAt).fromNow()}</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardBackground: {
    backgroundColor: '#F2EEEE',
  },
  card: {
    elevation: 4,
    borderRadius: 20,
    padding: 10,
    shadowRadius: 10,
    shadowColor: 'blue',
    backgroundColor: '#F2EEEE',
    marginBottom: 10,
    marginRight: 3,
    marginLeft: 3,
  },
  cardBackgrounddd: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2EEEE',
  },
  thumbNail: {
    // maxWidth: 200,
  },
  title: {
    fontSize: 32,
  },
});
