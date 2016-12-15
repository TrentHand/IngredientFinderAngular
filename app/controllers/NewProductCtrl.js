"use strict";

app.controller('NewProductCtrl', function($scope, ProductsFactory, LocationsFactory, AuthFactory, $window){
// console.log("newProductCtrlRunning: ");
// pulls in the current user from the AuthFactory
	let currentUser = AuthFactory.getUser();
	var geocoder = new google.maps.Geocoder;

// gets all the locations currently available for the user
	LocationsFactory.getUserLocations(currentUser)
	.then(function(userLocations){
		$scope.userLocations = userLocations;
		$scope.$apply();
	});


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
			$window.location.href = '#/main';
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
		navigator.geolocation.getCurrentPosition(function(position){
			$scope.newUserLocation.lat = position.coords.latitude;
			$scope.newUserLocation.long = position.coords.longitude;
			let latlng = {
				lat: $scope.newUserLocation.lat,
				lng: $scope.newUserLocation.long
			};
	 	geocoder.geocode({'location': latlng}, function(results, status) {
	    if (status === 'OK') {
	      if (results[0]) {
	      	$scope.newUserLocation.address = results[0].formatted_address;
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
  });

			});
	}

	$scope.postNewLocation = function(){
		LocationsFactory.postNewLocation($scope.newUserLocation);
	}

});