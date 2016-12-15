'use strict';

app.factory('LocationsFactory', function($http, FBCreds, GMapCreds, AuthFactory){
				let LocationsArr = [];
				let currentUser = AuthFactory.getUser();

	let getAllLocations = (fbKey) => {
		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/locations.json`)
			.success((LocationsObj) => {
				Object.keys(LocationsObj).forEach((key) => {
					let currentLocation = LocationsObj[key];
					currentLocation.id = key;
					LocationsArr.push(currentLocation);
				});
				resolve(LocationsArr);
			});
		});
	};

	let getSingleLocation = (LocationId) => {
	};

	let postNewLocation = (newLocation) => {
		newLocation.uid = currentUser;
		console.log("currentUser = ", currentUser);
		return new Promise((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/locations.json`, angular.toJson(newLocation))
			.success((obj) => {
 				getAllLocations(obj);
 				resolve(obj);
			})
			.error((error) => {
				reject(error);
			});

		});
	};

	let getUserLocations = (userId) => {
		let userLocationsArr = [];
		console.log("userId: ", userId);
		return new Promise((resolve, reject)=> {
			$http.get(`${FBCreds.databaseURL}/locations.json?orderBy="uid"&equalTo="${userId}"`)
			.success((userLocations) => {
				console.log("userLocations in LocationsFactory: ", userLocations);
				Object.keys(userLocations).forEach((fbKey) => {
					userLocations[fbKey].id = fbKey;
					userLocationsArr.push(userLocations[fbKey]);
				});
				resolve(userLocationsArr);
			})
			.error((error) => {
				reject(error);
			});
		});
	};





	return { getAllLocations, getSingleLocation, postNewLocation, getUserLocations };

});