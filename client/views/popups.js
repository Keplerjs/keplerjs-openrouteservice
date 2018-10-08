
Template.popupCursor_ors.events({

	'click .btn-directions': function(e, tmpl) {

		var locs = K.Ors.locs.get(),
			loc = tmpl.data.loc.reverse();

		if(locs.length < 2) {

			locs.push(loc);

			K.Ors.locs.set(locs);
			
			K.Map.hideCursor();
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