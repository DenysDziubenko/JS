/*global $*/

var app = app || {};

$(function() {
	var blocks = [
	{ highlighted: true, index: 1 },
	{ highlighted: false, index: 2 }
	];

	new app.BlocksView();
    //new app.LibraryView( blocks );
});