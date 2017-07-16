/**
 *  Application "5 day / 3 hour forecast" View
 */

define([
    'backbone',
    'jquery',
    'underscore',
    'chart',
    "text!itemTemplate/cities5dayForecastTemplate.html"
], function(
    Backbone,
    $,
    _,
    Chart,
    cities5dayForecastTemplate) {

    var Cities5dayForecastView = Backbone.View.extend({
        tagName: 'div',
        className: 'list-group-item',
        template: _.template(cities5dayForecastTemplate),
        attributesByDays: undefined,

        initialize: function() {
            this.model.on('destroy', this.remove, this);
        },

        events: {},

        render: function() {

            this.attributesByDays = separateAttrByDays(this.model.attributes.list);
            this.$el.html(this.template(this.attributesByDays));
            return this;

            // Separe data by days
            function separateAttrByDays(attributeList) {

                var attrByDays = {};

                attributeList.forEach(function(item, i) {
                    var day = item.dt_txt.split(" ")[0];
                    var time = item.dt_txt.split(" ")[1];

                    var newDate = new Date(day.split("-")[0], day.split("-")[1] - 1, day.split("-")[2]);
                    var newDay = day + "-" + newDate.toLocaleString('us', {
                        weekday: 'short'
                    });

                    attrByDays[newDay] = attrByDays[newDay] ? attrByDays[newDay] : {};
                    attrByDays[newDay][time] = item;

                });

                Object.keys(attrByDays).forEach(function(day) {
                    var timeDatasetArrs = {
                        timeArr: [],
                        tempArr: [],
                        pressArr: [],
                        humidityArr: [],
                        rainArr: [],
                        snowArr: []

                    };
                    Object.keys(attrByDays[day]).forEach(function(time) {
                        timeDatasetArrs.timeArr.push(time);
                        timeDatasetArrs.tempArr.push(attrByDays[day][time].main.temp);
                        timeDatasetArrs.pressArr.push(attrByDays[day][time].main.pressure);
                        timeDatasetArrs.humidityArr.push(attrByDays[day][time].main.humidity);

                        var rainObj = attrByDays[day][time].rain;
                        var snowObj = attrByDays[day][time].snow;

                        timeDatasetArrs.rainArr.push(!$.isEmptyObject(rainObj) ? (rainObj.hasOwnProperty('3h') ? rainObj['3h'] : 0) : 0);
                        timeDatasetArrs.snowArr.push(!$.isEmptyObject(snowObj) ? (snowObj.hasOwnProperty('3h') ? snowObj['3h'] : 0) : 0);
                    });

                    attrByDays[day]["timeDatasetArrs"] = timeDatasetArrs;

                });

                return {
                    days: attrByDays
                };
            }

        },

        initChart: function(id, datasetArrs) {

            var ctx = document.getElementById('myChart-' + id).getContext('2d');
            var chart = new Chart(ctx, {

                type: 'line',
                data: {
                    labels: datasetArrs.timeArr,
                    datasets: [{
                            label: "Temperature, [°C]",
                            borderColor: 'rgb(51, 122, 183)',
                            data: datasetArrs.tempArr,
                        }
                        // Uncoment this in case some of datasets need to be added to the chart
                        // , {
                        //     label: "Pressure, [hPa]",
                        //     borderColor: 'rgb(50, 183, 73)',
                        //     data: datasetArrs.pressArr,
                        // }, {
                        //     label: "Humidity, [%]",
                        //     borderColor: 'rgb(198, 218, 35)',
                        //     data: datasetArrs.humidityArr,
                        // }, {
                        //     label: "Rain volume for last 3 hours, [mm]",
                        //     borderColor: 'rgb(138, 82, 123)',
                        //     data: datasetArrs.rainArr,
                        // }, {
                        //     label: "Snow volume for last 3 hours, [mm]",
                        //     borderColor: 'rgb(142, 62, 73)',
                        //     data: datasetArrs.snowArr,
                        //     showLine: false
                        // }

                    ]
                },

                options: {}
            });
        }

    });

    return Cities5dayForecastView;
});
