"use strict";

app.controller('ViewAllProductsCtrl', function($scope, ProductsFactory){

	ProductsFactory.getAllProducts()
	.then((data) => {
		$scope.products = data;
		$scope.$apply();
	});

});