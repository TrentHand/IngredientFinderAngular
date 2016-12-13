"use strict";

app.controller('NavCtrl', function($scope){
	$scope.navItems = [
		{
			name: 'Login/Register',
			url: '#/login'
		},
		{
			name: 'Logout',
			url: '#/logout'
		},
		{
			name: 'View All Products',
			url: '#/main'
		},
		{
			name: 'Add Product',
			url: '#/addproduct'
		},
		{
			name: 'View My Products',
			url: '#/viewuserproducts'
		},
		{
			name: 'View My Locations',
			url: '#/viewuserlocations'
		}

	];
		console.log("nav items: ", $scope.navItems);
});