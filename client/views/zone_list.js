var zoneData = [
{
	title: "Master Bed Room"
	,status: 1
	,num: 1
},{
	title: "Blake's Bed Room"
	,status: 1
	,num: 2
},{
	title: "First Floor"
	,status: 0
	,num: 3
},{
	title: "First Floor Radiant"
	,status: 1
	,num: 4
},{
	title: "Domestic Hot Water"
	,status: 0
	,num: 5
},{
	title: "Basement Radiant"
	,status: 0
	,num: 6
}
];
Template.zoneList.helpers({
	zones: zoneData
});

Template.zoneList.events({
	'click input[type="radio"]': function (event) {
		console.log("Clicked:", this, $(event.currentTarget).val())
		var action = $(event.currentTarget).val();
		if (action == "On" || action == "Off" || action == "Thermostat")
		{
			var args = {
				"zone" : this.num
				,"action" : action
			};

			Meteor.call('updateZone', args, function(error, result) {
				if (error)
					console.err('i2cset error: ', error)
				else
					console.log('i2cset result: ', result)
			});
			
		}
		else
		{
			console.err("Unknown force type: '"+val+"'");
		}
	}
});