Meteor.methods({
	updateZone: function(args) {
		var opts = {
			msg:buildMessage(args)
		};
		return i2cset(opts)
	}
})

function buildMessage(args) {
	args.zone = args.zone - 1; //zones are zero indexed in the i2c link. @todo

	var require = Npm.require;
	var fut = new Future();
	var exec = require('child_process').exec;
	// console.log(args);
	var message = 0;
	if (args.action == "On")
		message |= 1<<4;
	if (args.action == "Off")
		message |= 1<<5;
	// if action == Thermostat then 0

	if (args.zone >= 16)
		return -1

	message |= args.zone;
	return message;
}

function i2cset(args) {

		var defaults = {
			bus: 1
			,addy: 0x04	//hex
			,msg: 0x00	//hex
		}
		var opts = _.extend({}, defaults, args);
		if (process.env.METEOR_ENV == 'prod')
		{
			child = exec('/usr/sbin/i2cset -y 1 0x04 0x'+opts.msg, //
			function (error, stdout, stderr) {
				if (error !== null) {
					console.log('exec error: ' + error);
				}
				fut['return'](error||0);
			});

			return fut.wait();
		}
		return 0;
	}