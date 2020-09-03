const functions = require("firebase-functions");

const app = require('express')();


const FBAuth = require('./util/fbAuth');


const { getAllPosts, makeOnePost } = require('./handlers/posts')
const { signup, login } = require('./handlers/users');




 
//Post routes
app.get('/posts', getAllPosts );
app.post('/post', FBAuth, makeOnePost );

//users route
app.post('/signup', signup );
app.post('/login', login)



exports.api = functions.region('europe-west1').https.onRequest(app);