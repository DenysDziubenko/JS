/*global Backbone*/
/*global _*/
/*global $*/

var app = app || {};

app.BlockView = Backbone.View.extend({
    tagName: 'div',
    className: 'galery-item',
    template: _.template($('#item-template').html()),

    initialize: function() {
        this.listenTo(this.model, "highlight", this.highlight);
    },

    events: {
        'click .remove': 'deleteBlock',
    },

    deleteBlock: function() {
        this.model.destroy();
        this.remove();
    },

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    highlight: function(isHighlighted) {
        isHighlighted ? this.$el.addClass("highlighted") : this.$el.removeClass("highlighted");
        this.model.set('highlighted', isHighlighted);
        this.render();
        this.model.save();

    }
});
