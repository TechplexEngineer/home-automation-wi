Meteor.methods({
	i2cset: function(args) {

		var require = Npm.require;
		var Future = Npm.require('fibers/future');
		var fut = new Future();
		var exec = require('child_process').exec;

		child = exec('/usr/sbin/i2cset -y 1 0x04 0x20', 
		function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			fut.ret(error||0);
		});

		return fut.wait();
	}
})