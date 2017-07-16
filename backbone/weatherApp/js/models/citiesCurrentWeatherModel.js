/**
 *	Application "Current weather data" model
 */

define(['backbone'], function(Backbone) {

    var CitiesCurrentWeatherModel = Backbone.Model.extend({
        defaults: {
            coord: {},
            weather: [],
            base: undefined,
            main: {},
            visibility: undefined,
            wind: {},
            clouds: {},
            dt: undefined,
            sys: {},
            id: undefined,
            name: undefined,
            cod: undefined
        }
    });

    return CitiesCurrentWeatherModel;
});
