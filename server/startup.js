Future = "fred"
Freddie = "joe"
Meteor.startup(function () {
	// console.log("Startup!")
	Future = Npm.require('fibers/future');
	// require = Npm.require;

	// Set up a future
	// var fut = new Future();

	// // This should work for any async method
	// setTimeout(function() {

	// 	// Return the results
	// 	fut['return']("(delayed for 3 seconds)");

	// }, 3 * 1000);

	// // Wait for async to finish before returning
	// // the result
	// console.log(fut.wait());

	// use Future here
});