'use strict';

app.factory('ProductsFactory', function($http, FBCreds){

	let getAllProducts = () => {
		let ProductsArr = [];
		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/products.json`)
			.success((data) => {
				Object.keys(data).forEach((fbKey) => {
					let ProductObj = data[fbKey];
					ProductObj.id = fbKey;
					ProductsArr.push(ProductObj);
				});

				resolve(ProductsArr);
			})
			.error((error) => {
				reject(error);
			});

		});
	};

	let postNewProduct = (newProduct) => {
		return new Promise((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/products.json`, angular.toJson(newProduct))
			.success((data)=> {
				console.log("data from postNewProduct",data );
				resolve(data);
			})
			.error ((error)=> {
				reject(error);
			});

		});
	};

	return {
		getAllProducts,
		postNewProduct
	};

});