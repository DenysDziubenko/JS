/*global $*/

var app = app || {};

$(function() {

	var appAll = new app.BlocksView();
	if (!appAll.collection.size()) {

		for (var i = 0; i <= 51; i++) {
			appAll.collection.create({
				highlighted: false,
				index: appAll.collection.size()
			});
		}
	}

});
