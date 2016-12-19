"use strict";

app.controller('ViewUserProductsCtrl', function($scope, ProductsFactory, LocationsFactory){

	$scope.products = [];

	ProductsFactory.getUserProducts()
		.then((products) => {
			console.log("products: ", products);
			return loopData(products);
		}).then((locations) => {
				console.log("locations: ", locations);
				$scope.products = locations;
				$scope.$apply();
		});

	function loopData(products) {
		let productPromises = [];

		return new Promise((resolve, reject) => {
			products.forEach((product) => {
				productPromises.push(LocationsFactory.getSingleLocation(product.locationid));
			});
			Promise.all(productPromises)
			.then((locations) => {
				products.forEach((product, index) => {
					product.locationName = locations[index].name;
					product.locationAddress = locations[index].address;
				})
				resolve(products);
			})
		})
	};


	$scope.removeProduct = (item) => {
		let index = $scope.products.indexOf(item)
		$scope.products.splice(index,1);
	};

				// .then((product) => {

				// })
});