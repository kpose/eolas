const functions = require("firebase-functions");

const app = require('express')();

const { db } = require('./util/admin')


const FBAuth = require('./util/fbAuth');


const { getAllPosts, makeOnePost, getPost, commentOnPost, likePost, unlikePost, deletePost } = require('./handlers/posts')
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead } = require('./handlers/users');


  
//Post routes
app.get('/posts', getAllPosts );
app.post('/post', FBAuth, makeOnePost );
app.get('/post/:postId', getPost)
app.post('/post/:postId/comment', FBAuth, commentOnPost)
app.delete('/post/:postId', FBAuth, deletePost);
app.get('/post/:postId/like', FBAuth, likePost);
app.get('/post/:postId/unlike', FBAuth, unlikePost);

//users route
app.post('/signup', signup );
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser) 
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead); 



exports.api = functions.region('europe-west1').https.onRequest(app);



//create like notification
exports.createNotificationOnLike = functions
  .region('europe-west1')
  .firestore.document('likes/{id}')
  .onCreate((snapshot) => {
      db
      .doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toDateString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            postId: doc.id
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });




//create notification for comments
exports.createNotificationOnComment = functions
  .region('europe-west1')
  .firestore.document('comments/{id}')
  .onCreate((snapshot) => {
    db
      .doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toDateString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            postId: doc.id
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });


//delete notification 
exports.deleteNotificationOnUnLike = functions
  .region('europe-west1')
  .firestore.document('likes/{id}')
  .onDelete((snapshot) => {
      db.doc(`/notifications/${snapshot.id}`)
        .delete()
        .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });