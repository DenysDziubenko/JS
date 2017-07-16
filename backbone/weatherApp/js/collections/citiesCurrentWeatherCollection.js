/**
 *	Application "Current weather data" collection 
 */

define([
    'backbone',
    "appModels/citiesCurrentWeatherModel"
], function(
    Backbone,
    CitiesCurrentWeatherModel) {

    var CitiesCurrentWeatherCollection = Backbone.Collection.extend({
        model: CitiesCurrentWeatherModel,
        // Need to change to your own API_KEY, see readme.md
        appid: 'API_KEY',
        cityId: undefined,
        url: function() {
            return 'http://api.openweathermap.org/data/2.5/weather?id=' + this.cityId + '&appid=' + this.appid + '&units=metric';
        }
    });

    return CitiesCurrentWeatherCollection;

});
