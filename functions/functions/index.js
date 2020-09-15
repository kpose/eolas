const functions = require("firebase-functions");

const app = require('express')();


const FBAuth = require('./util/fbAuth');


const { getAllPosts, makeOnePost, getPost, commentOnPost } = require('./handlers/posts')
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');




  
//Post routes
app.get('/posts', getAllPosts );
app.post('/post', FBAuth, makeOnePost );
app.get('/post/:postId', getPost)
app.post('/post/:postId/comment', FBAuth, commentOnPost)


//users route
app.post('/signup', signup );
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)  



exports.api = functions.region('europe-west').https.onRequest(app);