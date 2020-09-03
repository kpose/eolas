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
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
        });
      });
      return res.json(posts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

const FBAuth = (req, res, next) => {
  let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No Token Found')
        return res.status(403).json({ error: 'Unauthorized'});
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            console.log(decodedToken);
            return db.collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch(err => {
            console.error('Error while verifying token ', err);
            return res.status(403).json(err);
        })
}


//make single post

app.post('/post', FBAuth, (req, res) => {

  if (req.body.body.trim() === '') {
    return res.status(400).json({body: 'Body must not be empty' });
  }


  const newPost = {
    body: req.body.body,
    userHandle: req.user.handle,
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




const isEmpty = (string) => {
  if(string.trim() === '') return true;
  else return false;
}


const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
}





//sign up
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };


  let errors = {};

  if(isEmpty(newUser.email)) {
    errors.email= "Must not be empty"
  } else if (!isEmail(newUser.email)){
    errors.email = 'Must be a valid email address'
  }

  if(isEmpty(newUser.password)) errors.password = "Must not be empty";
  if(newUser.password !== newUser.confirmPassword) errors.confirmPassword = "Passwords do not match";
  if(isEmpty(newUser.handle)) errors.handle = "Must not be empty"


    if(Object.keys(errors).length > 0) return res.status(400).json(errors)
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
    });
});


//Login

app.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  let errors = {};

  if(isEmpty(user.email)) errors.email = "Must not be empty";
  if(isEmpty(user.password)) errors.password = "Must not be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({token});
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/wrong-password" || "auth/invalid-email"){
        return res.status(403).json({ general: 'Wrong credentials, please try again'});
      } 
      else return res.status(500).json({error: err.code});
    })
})

exports.api = functions.region('europe-west1').https.onRequest(app);