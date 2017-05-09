/*global Backbone*/
/*global Store*/

var app = app || {};

app.Blocks = Backbone.Collection.extend({
    model: app.Block,
    localStorage: new Store("backbone-block")
        // It's wrapper on the window.localstorage (in case we use only the window.localstorage, the changes in the collection will not save)
        // http://backbonejs.org/docs/backbone.localStorage.html 
});
