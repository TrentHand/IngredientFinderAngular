"use strict";

app.controller('ViewUserLocationsCtrl', function($scope, LocationsFactory){
	LocationsFactory.getUserLocations()
	.then((data) => {
		$scope.locations = data;
		$scope.$apply();
	});
});