/**
 *	Application "5 day / 3 hour forecast" model
 */

define(['backbone'], function(Backbone) {

    var Cities5dayForecastModel = Backbone.Model.extend({
        defaults: {
            cod: undefined,
            message: undefined,
            cnt: undefined,
            list: [],
            city: {}
        }
    });

    return Cities5dayForecastModel;
});
