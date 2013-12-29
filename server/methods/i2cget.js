Meteor.methods({
	fetchStatus: function(args) {
		return i2cget();
	}
	
})

function i2cget(args) {
	var defaults = {
		bus: 1
		,addy: 0x04
	}
	var opts = _.extend({}, defaults, args);

	var require = Npm.require;
	var fut = new Future();
	var exec = require('child_process').exec;

	if (process.env.METEOR_ENV == 'prod')
	{
		child = exec('/usr/sbin/i2cget -y '+opts.bus+' '+opts.addy,
		function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			fut['return'](stdout||error||0);
		});

		return fut.wait();
	}
	return 0;
}