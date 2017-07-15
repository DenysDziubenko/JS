/**
*	Application Collection
*/

define([
  'backbone.localStorage',
  'appModels/appModel'
  
  ], 
  function(
    Backbone,
    BaseModel){

	var BaseCollection = Backbone.Collection.extend({
      model: BaseModel,
      localStorage: new Backbone.LocalStorage("todos"),
      completed: function() {
        return this.filter(function( todo ) {
          return todo.get('completed');
        });
      },
      remaining: function() {
        return this.without.apply( this, this.completed() );
      }
    });

	 return BaseCollection;
});

