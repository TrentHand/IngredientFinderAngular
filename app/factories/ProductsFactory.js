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

	let deleteFbProduct = (itemId) => {
		return new Promise((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/products/${itemId}.json`).success(() => {
				resolve();
			})
			.error((error) => {
				console.log("product delete failed: ", error);
				reject(error);
			});
		});
	};

	// let deletePin = (pinId) => {
 //    return $q((resolve, reject) => {
 //      $http.delete(`${FirebaseURL}pins/${pinId}.json`)
 //        .success(() => {
 //          resolve();
 //        })
 //        .error((error)=> {
 //          console.log('pin delete fail:', error);
 //          reject(error);
 //        });
 //    });
 //  };

	return {
		getAllProducts,
		deleteFbProduct,
		postNewProduct,
		getUserProducts
	};

});