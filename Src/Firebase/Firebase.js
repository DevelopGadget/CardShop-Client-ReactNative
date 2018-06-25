import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDNMsX_UMN_u9pDbdokEQJ1tsg5_gbcHlg",
  authDomain: "example-node-8324d.firebaseapp.com",
  databaseURL: "https://example-node-8324d.firebaseio.com",
  projectId: "example-node-8324d",
  storageBucket: "example-node-8324d.appspot.com",
  messagingSenderId: "475888627974"
};

firebase.initializeApp(config);
const Auth = firebase.auth();
const Database = firebase.database();
const Firebase = firebase;
module.exports = {Auth, Database, Firebase}