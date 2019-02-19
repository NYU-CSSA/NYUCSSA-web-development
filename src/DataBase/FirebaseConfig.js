import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyARL_EZh2t3Q2HveRFs97JQES_NO73ulT0",
    authDomain: "nyu-cssa-web-dev.firebaseapp.com",
    databaseURL: "https://nyu-cssa-web-dev.firebaseio.com",
    projectId: "nyu-cssa-web-dev",
    storageBucket: "nyu-cssa-web-dev.appspot.com",
    messagingSenderId: "39043139004"
  };
  firebase.initializeApp(config);

var db = firebase.database();
export default db
