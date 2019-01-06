//ib requiring firebase for chat
var firebase = require("firebase");

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDtJxoAAs38xwYl0csYn6iOwlb32-I8tEY",
    authDomain: "concertbuddy-b687b.firebaseapp.com",
    databaseURL: "https://concertbuddy-b687b.firebaseio.com",
    projectId: "concertbuddy-b687b",
    storageBucket: "concertbuddy-b687b.appspot.com",
    messagingSenderId: "534586151144"
  };
  firebase.initializeApp(config);


    firebase.auth().onAuthStateChanged(function (user) {
      // Once authenticated, instantiate Firechat with the logged in user
      if (user) {
        initChat(user);
      }
    });
    //adding this bit of code since we're already using authentication with passport
    //need to figure out how to get a token from passport to use with firebase/firechat
    firebase.auth().signInWithCustomToken(token).catch(function (error) {
      console.log("Error authenticating user:", error);
    });

    function initChat(user) {
      // Get a Firebase Database ref
      var chatRef = firebase.database().ref("chat");

      // Create a Firechat instance
      var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

      // Set the Firechat user
      chat.setUser(user.uid, user.displayName);
    }