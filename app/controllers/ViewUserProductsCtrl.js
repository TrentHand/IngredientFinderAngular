"use strict";

app.controller('ViewUserProductsCtrl', function($scope, ProductsFactory, LocationsFactory){
	ProductsFactory.getUserProducts()
		.then((data) => {
			data.forEach((product) => {
				LocationsFactory.getSingleLocation(product.locationid)
				.then((location) => {
					console.log("location = :", location);
				})
			})
			$scope.products = data;
			console.log("data: ", $scope.products);
			$scope.$apply();
		});

});