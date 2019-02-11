import * as firebase from 'firebase';

var config = {
  
};

firebase.initializeApp(config);

var db = firebase.database();
export default db
