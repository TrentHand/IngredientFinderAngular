"use strict";

app.controller('LoginCtrl', function($scope, AuthFactory, $window){
// I NEED TO CHANGE THIS TO A GOOGLE LOGIN
	// $scope.account = {
	// 	email: '',
	// 	password: ''
	// };

	// $scope.register = () => {
	// 	AuthFactory.createUser($scope.account)
	// 	.then((userData) => {
	// 		$scope.login();
	// 	});
	// };

	// $scope.login = () => {
	// 	AuthFactory.loginUser($scope.account)
	// 	.then((user) => {
	// 		$window.location.href = '#/login';
	// 	});
	// };

	$scope.loginGoogle = () => {
		console.log("you clicked login with Google");
		AuthFactory.authWithProvider()
		.then(function(result) {
	    	var user = result.user.uid;
	    	console.log("logged in user:", user);
	    	//Once logged in, go to another view
	    	$location.path("/addproduct");
	    	$scope.$apply();
	  	}).catch(function(error) {
	    	// Handle the Errors.
	    	console.log("error with google login", error);
	    	var errorCode = error.code;
	    	var errorMessage = error.message;
	    	// The email of the user's account used.
	    	var email = error.email;
	    	// The firebase.auth.AuthCredential type that was used.
	    	var credential = error.credential;
	    	// ...
	  	});
	};

});

