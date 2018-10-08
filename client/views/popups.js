
Template.popupCursor_ors.events({
	'click .btn-ors': function(e,tmpl) {

		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');

		if(K.Ors._locs.length < 2) {
			K.Ors._locs.push(tmpl.data.loc.reverse());

			console.log('Ors locs', K.Ors._locs);
		}
		

		if(K.Ors._locs.length >= 2) {
		
		    K.Ors.routeByLocs(K.Ors._locs, function() {

				$(e.target).removeClass('disabled');
				icon$.removeClass('icon-loader');

			});
		}
	}
});

Template.popupGeojson_geoinfo.helpers({
	fields: function() {
		return Template.currentData().properties;
	}
});