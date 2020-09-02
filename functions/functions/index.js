const functions = require("firebase-functions");
const admin = require("firebase-admin");

const app = require('express')();

admin.initializeApp();

const config = {
  apiKey: "AIzaSyArVzy0AW4x1Ih3Cz3VNwe3N_kU61GQ_18",
    authDomain: "eolas-90876.firebaseapp.com",
    databaseURL: "https://eolas-90876.firebaseio.com",
    projectId: "eolas-90876",
    storageBucket: "eolas-90876.appspot.com",
    messagingSenderId: "437278046148",
    appId: "1:437278046148:web:f12e44701565394a5fd691",
    measurementId: "G-9408BS3QYR"
}

const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();


 
//Function to get all documents
app.get('/posts', (req, res) => {
  db
    .collection("posts")
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          ...doc.data()
        });
      });
      return res.json(posts);
    })
    .catch((err) => console.error(err));
})


//functions to create new documents(posts)

app.post('/post', (req, res) => {
  const newPost = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  db.collection('posts')
      .add(newPost)
      .then(doc => {
        res.json({ message: `docment ${doc.id} created successfully`});
      })
      .catch(err => {
        res.status(500).json({error: `something went wrong`});
        console.error(err)
      })
})



//sign up
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  //todo: validate data
  let token, userId;
  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if(doc.exists) {
        return res.status(400).json({ handle: "This Handle is already taken"});
      } else {
         return firebase
                  .auth()
                  .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid;
       return data.user.getIdToken()
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };

      db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({email: "Email already in use" });
      } else {
        return res.status(500).json({error: err.code});
      }
    })


  
})


exports.api = functions.region('europe-west1').https.onRequest(app);