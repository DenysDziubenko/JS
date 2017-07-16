/**
 *	Application "Current weather data" View
 */

/*global google*/

define([
    'backbone',
    'jquery',
    'underscore',
    "text!itemTemplate/citiesCurrentWeatherTemplate.html"
], function(
    Backbone,
    $,
    _,
    citiesCurrentWeatherTemplate) {

    var CitiesCurrentWeatherView = Backbone.View.extend({
        tagName: 'div',
        className: 'list-group-item',
        template: _.template(citiesCurrentWeatherTemplate),

        initialize: function() {
            this.model.on('destroy', this.remove, this);
        },

        events: {},

        render: function() {

            // Update sunrise/sunset for being more readeable
            this.model.attributes.sys.sunrise = unixTimeToJStime(this.model.attributes.sys.sunrise);
            this.model.attributes.sys.sunset = unixTimeToJStime(this.model.attributes.sys.sunset);

            this.$el.html(this.template(this.model.attributes));
            return this;

            // Convert a Unix timestamp to time in JavaScript
            function unixTimeToJStime(unix_timestamp) {
                var date = new Date(unix_timestamp * 1000);
                return date;
            }

        },

        initMap: function initMap(lat, lon) {
            var uluru = {
                lat: lat,
                lng: lon
            };
            var el = document.getElementById('map');
            var map = new google.maps.Map(el, {
                zoom: 8,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });

        }


    });

    return CitiesCurrentWeatherView;
});
