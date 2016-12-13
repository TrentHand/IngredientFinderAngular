"use strict";

app.factory('AuthFactory', function(){
	let currentUser = null;
// this also needs to be switched to Google signIn
	// let createUser = function(userObj){
	// 	return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password);
	// };

	let provider = new firebase.auth.GoogleAuthProvider();

	let authWithProvider= function(){
    	return firebase.auth().signInWithPopup(provider);
  	};

	// let loginUser = function(userObj){
	// 	return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password);
	// };

	let logoutUser = function(){
		return firebase.auth().signOut;
	};

	let isAuthenticated = function(){
		return new Promise((resolve, reject) => {
			firebase.auth().onAuthStateChanged((user) => {
				if(user){
					currentUser = user.uid;
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	};

	let getUser = function(){
		return currentUser;
	};

	return {
		// createUser,
		// loginUser,
		authWithProvider,
		logoutUser,
		isAuthenticated,
		getUser
	};

});