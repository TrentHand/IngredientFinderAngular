// WE SHOULDN'T NEED THIS CONTROLLER


"use strict";

app.controller('NewLocationCtrl', function($scope, ProductsFactory, LocationsFactory, AuthFactory, $window){
// console.log("newLocationCtrlRunning: ");
	// grabbing the geolocation and sending the information to Google

	var geocoder = new google.maps.Geocoder;

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
	      	console.log("results from geocoder", results[0].formatted_address);
	      	$scope.newUserLocation.address = results[0].formatted_address;
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
	      	// $window.location.href = '#/main';
	      	// $scope.$apply();
  });

			});


	}


});