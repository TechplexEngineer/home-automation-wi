Meteor.methods({
	i2cset: function(args) {

		args.zone = args.zone - 1; //zones are zero indexed in the i2c link. @todo

		var require = Npm.require;
		var fut = new Future();
		var exec = require('child_process').exec;
		console.log(args);
		var message = 0;
		if (args.action == "On")
			message |= 1<<5;
		if (args.action == "Off")
			message |= 1<<6;
		// if action == Thermostat then 0

		if (args.zone >= 16)
			return -1

		message |= args.zone;

		child = exec('/usr/sbin/i2cset -y 1 0x04 0x'+message.toString(16), //
		function (error, stdout, stderr) {
			// console.log('stdout: ' + stdout);
			// console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			fut['return'](error||0);
		});

		return fut.wait();
	}
})