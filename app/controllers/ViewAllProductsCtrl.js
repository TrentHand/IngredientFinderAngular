"use strict";

app.controller('ViewAllProductsCtrl', function($scope, ProductsFactory, LocationsFactory){
	ProductsFactory.getAllProducts()
	.then((data) => {
		$scope.products = data;
		$scope.$apply();
	});

});