
Template.panelSettings_ors.helpers({
	profiles: function() {
		
		var userP = K.Profile.getOpts('ors.profile') || K.settings.public.openrouteservice.profile;

		return _.map(K.settings.public.openrouteservice.profiles, function(p) {
			return {
				val: p,
				name: p.replace('-',' '),//i18n('label_ors_'+p),
				active: userP === p
			};
		});
	}
});

Template.panelSettings_ors.events({
	
	'change #ors_profile input': _.debounce(function(e) {
		e.preventDefault();

		var val = $(e.currentTarget).val();

		Users.update(Meteor.userId(), { $set: {'settings.ors.profile': val } });

	}, 300),
});