"use strict";

app.controller('NewProductCtrl', function($scope, ProductsFactory, LocationsFactory, AuthFactory, $window){
console.log("newProductCtrlRunning: ");
// pulls in the current user from the AuthFactory
	let currentUser = AuthFactory.getUser();

// gets all the locations currently available for the user
	LocationsFactory.getUserLocationss(currentUser)
	.then(function(allUserLocations){
		console.log('allUserLocations', allUserLocations);
		$scope.userLocations = allUserLocations;
		$scope.$apply();
	});


	$scope.newUserProduct = {
		"locationid": "",
		"id": "",
		"uid": currentUser,
		"description": ""
	};

	$scope.addNewProduct = function(){
		console.log('$scope.newUserProduct', $scope.newUserProduct);
		ProductsFactory.postNewProduct($scope.newUserProduct)
		.then((response) => {
			// console.log("response = ", response);
			$window.location.url = '#/';
			$scope.$apply();
		});
	};
});