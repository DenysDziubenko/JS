/**
*	Application View
*/

define([
  'backbone',
  'jquery',
  'underscore',
  'appViews/itemView'], 
  function(
    Backbone,
    $, 
    _,
    ItemView){

    var AppView = Backbone.View.extend({
      el: '#todoapp',
      initialize: function () {
        this.input = this.$('#new-todo');
        this.collection.on('add', this.addOne, this);
        this.collection.on('reset', this.addAll, this);
      },
      events: {
        'keypress #new-todo': 'createTodoOnEnter',
        'click .destroyAll': 'destroy'
      },
      createTodoOnEnter: function(e){
        if ( e.which !== 13 || !this.input.val().trim() ) {
          return;
        }
        this.collection.create(this.newAttributes());
        this.input.val('');
      },
      addOne: function(todo){
        var view = new ItemView({model: todo});
        $('#todo-list').append(view.render().el);
      },
      addAll: function(){
        $('#todo-list').html('');
        
        switch(window.filter){
          case 'pending':
          $("a[href$='#/']").css( "display", "block" , "color", "#0060B6");
          $("a[href$='#/pending']").css( "display", "none" );
          $("a[href$='#/completed']").css( "display", "block" );
          _.each(this.collection.remaining(), this.addOne);
          break;
          case 'completed':
          $("a[href$='#/']").css( "display", "block" );
          $("a[href$='#/pending']").css( "display", "block" );
          $("a[href$='#/completed']").css( "display", "none" );
          _.each(this.collection.completed(), this.addOne);
          break;
          default:
          $("a[href$='#/']").css( "display", "none" );
          $("a[href$='#/pending']").css( "display", "block" );
          $("a[href$='#/completed']").css( "display", "block" );
          this.collection.each(this.addOne, this);
          break;
        }
      },
      newAttributes: function(){
        return {
          title: this.input.val().trim(),
          completed: false
        };
      },
      destroy: function(){
      while(this.collection.at(0)){
        this.collection.at(0).destroy();
      }
    }
  });

	return AppView;
});
