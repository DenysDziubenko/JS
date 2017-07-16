/**
 *	Application object
 */

define([
	'appCollections/citiesCurrentWeatherCollection',
	'appCollections/cities5dayForecastCollection',
	'appViews/weatherView',
	'json!cityList/cityList.json',
	'json!countrieList/countrieList.json',
	'jquery',
	'jqueryUI',
	'bootstrap',
	'backbone'
], function(
	CitiesCurrentWeatherCollection,
	Cities5dayForecastCollection,
	WeatherView,
	CityList,
	CountrieList,
	$,
	jqueryUI,
	bootstrap,
	Backbone) {

	var Application = (function() {

		var appView;

		var citiesCurrentWeatherCollection;

		var cities5dayForecastCollection;

		var self = null;

		var module = function() {
			self = this;
		};

		module.prototype = {
			constructor: module,

			init: function() {
				self.initBasicView();
				self.initCollections();
				self.initView();

			},
			initBasicView: function() {
				var jsonCityList = CityList;
				var jsonCountrieList = CountrieList;

				var allCountries = [];
				for (var i = 0; i < jsonCityList.length; i++) {
					for (var j = 0; j < jsonCountrieList.length; j++) {
						if (jsonCityList[i].country === jsonCountrieList[j].code) {
							allCountries[i] = jsonCityList[i].country + " - " + jsonCountrieList[j].name;
						}
					}
				}

				var distinctCountries = allCountries.filter(function(value, index, self) {
					return self.indexOf(value) === index;
				});


				$("#countries").autocomplete({
					source: distinctCountries,
					minLength: 2
				});

				$("#cities").bind("focus", function() {
					if ($("#countries").val() != '') {
						var selectedCounty = $("#countries").val().substring(0, 2);

						var objOfCountry = jsonCityList.filter(function(item) {
							return item.country === selectedCounty;
						});
						var citiesOfCountry = objOfCountry.map(function(obj) {

							return obj.name + ", id - " + obj.id;
						});

						$("#cities").autocomplete({
							source: citiesOfCountry,
							minLength: 3
						});
					}
				});

			},

			initView: function() {
				appView = new WeatherView({
					collection: {
						citiesCurrentWeatherCollection: citiesCurrentWeatherCollection,
						cities5dayForecastCollection: cities5dayForecastCollection
					}
				});
			},

			initCollections: function() {
				citiesCurrentWeatherCollection = new CitiesCurrentWeatherCollection();
				cities5dayForecastCollection = new Cities5dayForecastCollection();
			}

		};

		return module;

	})();

	return Application;

});
