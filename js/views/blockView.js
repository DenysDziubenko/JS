/*global Backbone*/
/*global _*/
/*global $*/

var app = app || {};

app.BlockView = Backbone.View.extend({
    tagName: 'div',
    className: 'galery-item',
    template: _.template($('#item-template').html()),

    events: {
        'click .remove': 'deleteBlock',
    },

    deleteBlock: function() {
        //Delete model
        this.model.destroy();

        //Delete view
        this.remove();
    },

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html(this.template(this.model.attributes));

        // TODO highlight blocks changing the models in the collection
        // this.listenTo(this.model, "highlight", function (isHighlighted) {
        //     console.log(isHighlighted);
        // });

        return this;
    },

    // TODO highlight blocks changing the models in the collection
    highlight: function() {}

});
