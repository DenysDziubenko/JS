/**
 *	Application "5 day / 3 hour forecast" collection
 */

define([
    'backbone',
    "appModels/cities5dayForecastModel"
], function(
    Backbone,
    Cities5dayForecastModel) {

    var Cities5dayForecastCollection = Backbone.Collection.extend({
        model: Cities5dayForecastModel,
        // Need to change to your own API_KEY, see readme.md
        appid: 'API_KEY',
        cityId: undefined,
        url: function() {
            return 'http://api.openweathermap.org/data/2.5/forecast?id=' + this.cityId + '&appid=' + this.appid + '&units=metric';
        }
    });

    return Cities5dayForecastCollection;

});
