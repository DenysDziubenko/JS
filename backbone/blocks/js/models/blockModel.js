/*global Backbone*/

var app = app || {};

app.Block = Backbone.Model.extend({
    defaults: {
        highlighted: false,
        index: undefined
    }
});
