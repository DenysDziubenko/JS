/**
*	Application Controller
*/

define(['backbone'], function(Backbone){

  var Controller = Backbone.Router.extend({
    initialize: function (options) {
        this.appCollection = options.collection;
      },
    routes: {
      '*filter' : 'setFilter'
    },
    setFilter: function(params) {
            window.filter = params.trim() || '';
            this.appCollection.trigger('reset');
          }
        });

  return Controller;
});

