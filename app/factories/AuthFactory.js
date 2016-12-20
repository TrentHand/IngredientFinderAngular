"use strict";

app.factory('AuthFactory', function(){
	let currentUser = null;


	let provider = new firebase.auth.GoogleAuthProvider();

	let authWithProvider= function(){
    	return firebase.auth().signInWithPopup(provider);
  	};


	let logoutUser = () => {
		console.log("logoutUser is running");
		return firebase.auth().signOut();
	};



	let isAuthenticated = function(){
		return new Promise((resolve, reject) => {
			firebase.auth().onAuthStateChanged((user) => {
				if(user){
					currentUser = user.uid;
					resolve(true);
				} else {
					currentUser = null;
					resolve(false);
				}
			});
		});
	};

	let getUser = function(){
		return currentUser;
	};

	return {
		authWithProvider,
		logoutUser,
		isAuthenticated,
		getUser
	};

});