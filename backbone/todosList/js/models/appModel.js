/**
*	Application Model
*/

define(['backbone'], function(Backbone){

	var BaseModel = Backbone.Model.extend({
      defaults: {
        title: '',
        completed: false
      },
      toggle: function(){
        this.save({ completed: !this.get('completed')});
      }
    });

	 return BaseModel;
});

