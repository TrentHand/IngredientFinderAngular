'use strict';

app.factory('LocationsFactory', function($http, FBCreds, GMapCreds){
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
				resolve(LocationsArr);
			});
		});
	};

	let getSingleLocation = (LocationId) => {
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
		let userLocationsArr = [];
		return new Promise((resolve, reject)=> {
			$http.get(`${FBCreds.databaseURL}/locations.json?orderBy="uid"&equalTo="${userId}"`)
			.success((userLocations) => {
				Object.keys(userLocations).forEach((fbKey) => {
					userLocations[fbKey].id = fbKey;
					userLocationsArr.push(userLocations[fbKey]);
				});
				resolve(userLocationsArr);
			});
		});
	};

	// 	let getCurrentLocationPlaceid = (lat, long) => {
	// 	return new Promise((resolve, reject)=> {
	// 		// get this from the postman
	// 		$http.get(`https://maps.googleapis.com/maps/api/place/radarsearch/json?location=${lat},${long}&radius=50&type=business&key=${GMapCreds.apiKey}`)
	// 		.success((currentLocationPlaceid) => {
	// 			resolve(currentLocationPlaceid);
	// 			console.log("currentLocationPlaceid", currentLocationPlaceid);
	// 			});
	// 		});
	// };


	// 	let getCurrentLocationAddress = (placeid) => {
	// 	return new Promise((resolve, reject)=> {
	// 		$http.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJb5on_wlmZIgRdcjMg9n5eLM&key=AIzaSyD0-3rF7IRkTdzTSpCuiWuJkXzw9exwOM8`)
	// 		.success((currentLocationAddress) => {
	// 			resolve(currentLocationAddressLocationAddress);
	// 		});
	// 	});
	// };

	// 	let getCurrentLocationName = (address) => {
	// 	return new Promise((resolve, reject)=> {
	// 		// get this from the postman
	// 		$http.get(``)
	// 		.success((currentLocationName) => {
	// 			resolve(currentLocationName);
	// 			});
	// 		});
	// };

	return { getAllLocations, getSingleLocation, postNewLocation, getUserLocations };

});