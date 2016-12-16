"use strict";

app.controller('ViewUserProductsCtrl', function($scope, ProductsFactory, LocationsFactory){
	ProductsFactory.getUserProducts()
		.then((data) => {
			data.map((product) => {
				LocationsFactory.getSingleLocation(product.locationid)
				.then((location) => {
					product.locationName = location.name;
					product.locationAddress = location.address;
					console.log("location = :", location);
					console.log("product: ", product);
					return product;
				})
			})
			$scope.products = data;
			console.log("data: ", $scope.products);
			$scope.$apply();
		});

});