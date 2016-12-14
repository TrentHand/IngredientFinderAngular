"use strict";

app.controller('NewLocationCtrl', function($scope, ProductsFactory, LocationsFactory, AuthFactory, $window){
// console.log("newLocationCtrlRunning: ");
	// grabbing the geolocation and sending the information to Google

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
			LocationsFactory.getCurrentLocationPlaceid($scope.newUserLocation.lat, $scope.newUserLocation.long)
			.then((response) => {
				console.log("currentLocation = ", response);
			});
		});
		console.log("newUserLocation = ", $scope.newUserLocation);
	}
});