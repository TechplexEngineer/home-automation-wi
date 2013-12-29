Future = ""
Meteor.startup(function () {
	Future = Npm.require('fibers/future');

	Meteor.setInterval(ReadZoneStatus, 2*1000); //every 2 seconds
	
});

function ReadZoneStatus()
{
	Meteor.call("fetchStatus", null, function(error, result){
		console.log(error||result.toString(16))
		//store result in db
	});
}