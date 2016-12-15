'use strict';

app.factory('ProductsFactory', function($http, FBCreds, AuthFactory){

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


	let getUserProducts = () => {
		let UserProducts = [];
		return new Promise ((resolve, reject) => {
			let currentUser = AuthFactory.getUser();
			$http.get(`${FBCreds.databaseURL}/products.json?orderBy="uid"&equalTo="${currentUser}"`)
			.success((data) => {
				Object.keys(data).forEach((fbKey) => {
				let ProductObj = data[fbKey];
				ProductObj.id = fbKey;
				UserProducts.push(ProductObj);
			});
			resolve(UserProducts);
			})
		.error((error) => {
			reject(error);
		});
		})
	};

	// url: `https://moviehistory-f323f.firebaseio.com/movies.json?orderBy="uid"&equalTo="${currentUserID}"`

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
		postNewProduct,
		getUserProducts
	};

});