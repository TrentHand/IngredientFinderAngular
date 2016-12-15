'use strict';

let app = angular.module('IngredientFinder', ['ngRoute', 'angularReverseGeocode']);

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
	AuthFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists){
			resolve();
		} else {
			reject();
		}
	});
});

app.config(function($routeProvider){
	$routeProvider
	   .when("/login", {
            templateUrl: "partials/Login.html",
            controller: "LoginCtrl"
        }).
        when("/viewproduct", {
            templateUrl: "partials/SingleProduct.html",
            controller: "SingleProductCtrl"
        }).
        when("/main", {
            templateUrl: "partials/ViewAllProducts.html",
            controller: "ViewAllProductsCtrl"
        }).
        when("/viewlocation", {
            templateUrl: "partials/ViewSingleLocation.html",
            controller: "ViewSingleLocationCtrl"
        }).
        when("/addlocation", {
            templateUrl: "partials/AddLocation.html",
            controller: "NewLocationCtrl",
            resolve: {isAuth}
        }).
        when("/addproduct", {
            templateUrl: "partials/NewProduct.html",
            controller: "NewProductCtrl",
            resolve: {isAuth}
        }).
        when("/viewuserlocations", {
            templateUrl: "partials/ViewUserLocations.html",
            controller: "ViewUserLocationsCtrl",
            resolve: {isAuth}
        }).
        when("/viewuserproducts", {
            templateUrl: "partials/ViewUserProducts.html",
            controller: "ViewUserProductsCtrl",
            resolve: {isAuth}
        }).
        otherwise('/main')

});

app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain
	};
	firebase.initializeApp(authConfig);
});
