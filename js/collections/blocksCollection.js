/*global Backbone*/
/*global Store*/

var app = app || {};

app.Blocks = Backbone.Collection.extend({
    model: app.Block,
    localStorage: new Store("backbone-block")
        // TODO use the window.localstorage
});
