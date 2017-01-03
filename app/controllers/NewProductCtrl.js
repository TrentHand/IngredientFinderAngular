"use strict";

app.controller('NewProductCtrl', function($scope, ProductsFactory, GMapCreds, LocationsFactory, AuthFactory, $window){
// console.log("newProductCtrlRunning: ");
// pulls in the current user from the AuthFactory
	let currentUser = AuthFactory.getUser();
	var geocoder;


// gets all the locations currently available for the user
	let getTheLocations = function() {
		LocationsFactory.getUserLocations(currentUser)
		.then(function(userLocations){
			$scope.userLocations = userLocations;
			$scope.$apply();
		});		
	};

	getTheLocations();



	$scope.newUserProduct = {
		"locationid": "",
		"uid": currentUser,
		"description": ""
	};

	$scope.addNewProduct = function(){
		$scope.newUserProduct.locationid = $scope.selectedLocation;
		ProductsFactory.postNewProduct($scope.newUserProduct)
		.then((response) => {
			// redirects to a page after the product is saved
			$window.location.href = '#/viewuserproducts';
			$scope.$apply();
		});
	};


	$scope.newUserLocation = {
		"name": "",
		"lat": "",
		"long": "",
		"address": ""
	};


	$scope.addNewLocation = function(){
		console.log("addNewLocation clicked");
		// GEOLOCATION FUNCTIONS
		geocoder = new google.maps.Geocoder();
		navigator.geolocation.getCurrentPosition(function(position){
			$scope.newUserLocation.lat = position.coords.latitude;
			$scope.newUserLocation.long = position.coords.longitude;
			let latlng = {
				lat: $scope.newUserLocation.lat,
				lng: $scope.newUserLocation.long
			};
	 	geocoder.geocode({'location': latlng}, function(results, status) {
	 		console.log("latlng", latlng);
	    if (status === 'OK') {
	      if (results[0]) {
	      	console.log("results: ", results);
	      	$scope.newUserLocation.address = results[0].formatted_address;
	      	$scope.$apply();
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    		}
  			});
		});
	};

	$scope.postNewLocation = function(){
		LocationsFactory.postNewLocation($scope.newUserLocation)
			.then((response) => {
					getTheLocations();
			})
	};

});