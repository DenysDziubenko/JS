/**
 *	Application Weather View
 */

define([
    'spinner',
    'backbone',
    'jquery',
    'underscore',
    'itemViews/citiesCurrentWeatherView',
    'itemViews/cities5dayForecastView',
    "text!errorTemplate/error-template.html",
], function(
    Spinner,
    Backbone,
    $,
    _,
    CitiesCurrentWeatherView,
    Cities5dayForecastView,
    errorTemplate) {

    var AppWeatherView = Backbone.View.extend({
        el: '#weatherApp',
        spinner: new Spinner(),

        initialize: function() {
            this.listenTo(this.collection.citiesCurrentWeatherCollection, 'add', this.addCitiesCurrentWeather),
                this.listenTo(this.collection.cities5dayForecastCollection, 'add', this.addCities5dayForecast);
        },

        events: {
            'click #button': 'fetchCurrentWeather',
            'click .menu1:not(.active)': 'fetchCity5dayForecastView'
        },

        getCityIdFromInput: function() {
            if (!$("#cities").val().match(/\d+$/)) {
                return;
            }

            var selectedCityId = $("#cities").val().match(/\d+$/)[0];
            return selectedCityId;
        },


        fetchCurrentWeather: function() {

            if (!this.getCityIdFromInput()) {
                return;
            }

            // Switch to the Current weather tab for proper rendering the google map
            this.showCurrentWeatherTab();

            this.collection.citiesCurrentWeatherCollection.cityId = this.getCityIdFromInput();

            var spinner = this.spinner;
            spinner.spin(this.el);

            var model = this.collection.citiesCurrentWeatherCollection.at(0);
            if (model) {
                model.trigger('destroy', model);
            }

            this.collection.citiesCurrentWeatherCollection.fetch({
                error: function(collection, response) {
                    var template = _.template(errorTemplate);
                    $('#currentWeatherContainer').append(template(response));
                    spinner.stop();
                }
            });

        },

        fetchCity5dayForecastView: function() {

            if (!this.getCityIdFromInput()) {
                return;
            }

            this.collection.cities5dayForecastCollection.cityId = this.getCityIdFromInput();

            var spinner = this.spinner;
            spinner.spin(this.el);

            var model = this.collection.cities5dayForecastCollection.at(0);
            if (model) {
                model.trigger('destroy', model);
            }

            this.collection.cities5dayForecastCollection.fetch({
                error: function(collection, response) {
                    var template = _.template(errorTemplate);
                    $('#5dayForecastContainer').append(template(response));
                    spinner.stop();
                }
            });
        },

        addCitiesCurrentWeather: function(cityCurrentWeather) {
            var cityForecastitiesCurrentWeatherView = new CitiesCurrentWeatherView({
                model: cityCurrentWeather
            });

            $('#currentWeatherContainer').append(cityForecastitiesCurrentWeatherView.render().el);
            cityForecastitiesCurrentWeatherView.initMap(cityForecastitiesCurrentWeatherView.model.attributes.coord.lat,
                cityForecastitiesCurrentWeatherView.model.attributes.coord.lon);

            this.showTooltips();
            this.spinner.stop();

        },

        addCities5dayForecast: function(city5dayForecast) {
            var city5dayForecastView = new Cities5dayForecastView({
                model: city5dayForecast
            });
            $('#5dayForecastContainer').append(city5dayForecastView.render().el);

            Object.keys(city5dayForecastView.attributesByDays.days).forEach(function(key) {

                var datasetArrs = city5dayForecastView.attributesByDays.days[key]["timeDatasetArrs"];

                city5dayForecastView.initChart(key, datasetArrs);

            });


            this.showTooltips();
            this.spinner.stop();
        },

        showCurrentWeatherTab: function() {
            $(".home").addClass("active");
            $(".menu1").removeClass("active");

            $("#home").addClass("fade in active");
            $("#menu1").removeClass("fade in active");
        },

        showTooltips: function() {
            // Show tooltips for the icons
            $('[data-toggle="tooltip"]').tooltip();
        }

    });

    return AppWeatherView;
});
