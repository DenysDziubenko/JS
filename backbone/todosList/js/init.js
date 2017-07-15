/*global requirejs*/

requirejs.config({
    baseUrl: "js/library",
    paths: {
		jquery: 'jquery.min',
		backbone: 'backbone.min',
                  'backbone.localStorage': 'backbone.localStorage',
		underscore: 'underscore.min',
		appControllers: '../controllers',
		appCollections: '../collections',
		appModels: '../models',
		appViews: '../views',
		itemViews: '../views',
		itemTemplate: '../templates'
    },
	shim: {
        'underscore': {
            exports: '_'
        },		
		'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
      		exports: 'Backbone'
        }
	}
});

require(["jquery", "../application"], function ($, Application) {
	$(document).ready(function() {
		var myApplication = new Application();
		myApplication.init();
	});
});	 
