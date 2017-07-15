/**
 *	Application object
 */

define([
	'appCollections/appCollection',
	'appViews/appView',
	'appControllers/appController',
	'jquery',
	'backbone'],
	function(
		BaseCollection, 
		AppView, 
		Controller, 
		$, 
		Backbone) {

	var Application = (function() {

		var appView;

		var appController;

		var appCollection;

		var self = null;

		var module = function() {
			self = this;
		};

		// Methods
		module.prototype = {
			constructor: module,

			init: function() {

				self.initCollection();
				self.initView();
				self.initRouter();
			},

			initRouter: function() {
				appController = new Controller({
					collection: appCollection
				});
				Backbone.history.start();
			},

			initView: function() {
				appView = new AppView({
					collection: appCollection
				});
			},

			initCollection: function() {
				appCollection = new BaseCollection();
			},

		};

		return module;

	})();

	return Application;
});
