"use strict";

app.controller('NavCtrl', function($scope, AuthFactory, $window){
	$scope.navItems = [
		{
			name: 'Login/Register',
			url: '#/login'
		},
		{
			name: 'View All Products',
			url: '#/main'
		},
		{
			name: 'Add Product',
			url: '#/addproduct'
		},
		{
			name: 'View My Products',
			url: '#/viewuserproducts'
		}

	];

	$scope.logOut = () => {
		console.log("logOut");
		AuthFactory.logoutUser()
		.then((logoutData) => {
			$window.location.href = '#/main';
			console.log("Logged out", logoutData);
		});
	};

	// $scope.logOut = () => {
	// 	AuthFactory.logoutUser()
	// 	.then((logoutData) => {
	// 		console.log("logoutData", logoutData);
	// 		AuthFactory.isAuthenticated()
	// 		.then((Authdata) => {
	// 			console.log("Authdata", Authdata)
	// 			$window.location.href = "#/main";
	// 		});
	// 	});
	// };
});