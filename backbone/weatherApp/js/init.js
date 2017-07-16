/*global requirejs*/


requirejs.config({
    baseUrl: "js/lib",
    waitSeconds: 200,
    paths: {
        jquery: 'jquery-3.2.1',
        jqueryUI: 'jquery-ui',
        bootstrap: 'bootstrap.min',
        backbone: 'backbone.min',
        underscore: 'underscore.min',
        chart: 'Chart',
        spinner: 'spin',
        appCollections: '../collections',
        appModels: '../models',
        appViews: '../views',
        itemViews: '../views',
        itemTemplate: '../templates',
        errorTemplate: '../templates',
        cityList: '../../resources',
        countrieList: '../../resources'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        "jqueryUI": {
            exports: "jqueryUI",
            deps: ['jquery']
        },
        "bootstrap": {
            deps: ['jquery']
        }
    }
});

require(['jquery', 'spinner'], function($, Spinner) {

    var target = $("#weatherApp").get(0);
    var spinner = new Spinner().spin(target);

    require(['../backboneApp'], function(BackboneApp) {

        $(document).ready(function() {
            var backboneApp = new BackboneApp();
            backboneApp.init();
        });
        spinner.stop();
    });

});
