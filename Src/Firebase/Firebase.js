import * as firebase from 'firebase';

var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
};

firebase.initializeApp(config);
const Auth = firebase.auth();
const Database = firebase.database();

module.exports = {Auth, Database}