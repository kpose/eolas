const functions = require("firebase-functions");

const app = require('express')();


const FBAuth = require('./util/fbAuth');


const { getAllPosts, makeOnePost } = require('./handlers/posts')
const { signup, login, uploadImage, addUserDetails } = require('./handlers/users');




 
//Post routes
app.get('/posts', getAllPosts );
app.post('/post', FBAuth, makeOnePost );

//users route
app.post('/signup', signup );
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)



exports.api = functions.region('europe-west').https.onRequest(app);