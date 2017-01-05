**Ingredient Finder Angular**

The purpose of this application is to allow users to locate the stores they last purchased items or ingredients.  This is my front-end capstone project for Nashville Software School-Cohort 16.

***INSTALLATION***

Begin by forking this repository and in your terminal, cd to the location you would like to pull down the application.  

Use "git clone " followed by the http address located on Github.

After pulling the app down, cd into the lib folder and run the following commands:

$npm install
$bower install

You will also need to create two files in a folder named "values".  The paths should be:

/app/values/fb-getter.js
/app/values/GooglePlace-getter.js

These will be the folders you need to put in your GoogleMaps API key and the Firebase key.  

Code to place in fb-getter.js:
app.constant('FBCreds', {
   apiKey: "PLACE KEY HERE",
   authDomain: "PLACE KEY HERE",
   databaseURL: "PLACE KEY HERE"
});

Code to place in GooglePlace-getter.js:
app.constant('GMapCreds', {
   apiKey: "PLACE KEY HERE"
 });

At this point, you should have all the necessary components to run the application and make any changes you like.