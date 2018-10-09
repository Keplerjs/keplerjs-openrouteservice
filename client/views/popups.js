
Template.popupCursor_ors.events({

	'click .btn-directions': function(e, tmpl) {

		var locs = K.Ors.locs.get(),
			loc = tmpl.data.loc.reverse();

		if(locs.length < 2) {

			locs.push(loc);

			K.Ors.locs.set(locs);
			
			//K.Map.hideCursor();

			sAlert.info(i18n('error_ors_directions_to'));
		}
		
		if(locs.length >= 2) {
		
		    K.Ors.routeByLocs(locs);
		}
	}
});

Template.popupCursor_ors.helpers({
	locs: function() {
		return K.Ors.locs.get();
	}
});