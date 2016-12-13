'use strict';

app.factory('LocationsFactory', function($http, FBCreds){
				let LocationsArr = [];

	let getAllLocations = (fbKey) => {
		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/locations.json`)
			.success((LocationsObj) => {
				Object.keys(LocationsObj).forEach((key) => {
					let currentLocation = LocationsObj[key];
					currentLocation.id = key;
					LocationsArr.push(currentLocation);
				});
				console.log('LocationsArr', LocationsArr);
				resolve(LocationsArr);
			});
		});
	};

	let getSingleLocation = (LocationId) => {
		console.log('getSingleLocation(LocationId)', LocationId);
	};

	let postNewLocation = (newLocation) => {
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
		console.log('userId', userId);
		let userLocationsArr = [];
		return new Promise((resolve, reject)=> {
			$http.get(`${FBCreds.databaseURL}/locations.json?orderBy="uid"&equalTo="${userId}"`)
			.success((userLocations) => {
				Object.keys(userLocations).forEach((fbKey) => {
					userLocations[fbKey].id = fbKey;
					userLocationsArr.push(userLocations[fbKey]);
				});
				console.log('userLocationsArr', userLocationsArr);
				resolve(userLocationsArr);
			});
		});
	};

	return { getAllLocations, getSingleLocation, postNewLocation, getUserLocations };

});