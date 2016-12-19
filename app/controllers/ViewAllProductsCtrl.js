"use strict";

app.controller('ViewAllProductsCtrl', function($scope, ProductsFactory, LocationsFactory){
	ProductsFactory.getAllProducts()
	.then((data) => {
			data.map((product) => {
				LocationsFactory.getSingleLocation(product.locationid)
				.then((location) => {
					product.locationName = location.name;
					product.locationAddress = location.address;
					// console.log("location = :", location);
					console.log("product: ", product);
					return product;
				})
			})
		$scope.products = data;
		$scope.$apply();
	});

});