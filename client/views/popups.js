
Template.popupCursor_ors.events({
	'click .btn-directions': function(e, tmpl) {
		K.Ors.routeAddLoc(tmpl.data.loc);
		
		K.Map.hideCursor();
	
	}
});

Template.popupCursor_ors.helpers({
	isFrom: function() {
		return K.Ors.locs.get().length;
	}
});
