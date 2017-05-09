/*global Backbone*/
/*global _*/
/*global $*/

var app = app || {};

app.BlocksView = Backbone.View.extend({
    el: '#blocksApp',
    selectedBlock: undefined,

    initialize: function() {
        this.collection = new app.Blocks();
        this.listenTo(this.collection, 'add', this.addOne);
        $(document).on('keyup', this.highlightOnkeyUp.bind(this)); // workaround for the line 24
        this.collection.fetch();
        this.selectedBlock = this.collection.findWhere({
            highlighted: true
        });
    },

    events: {
        'click #button': 'addBlock',
        'click .container': 'highlight'
            // 'keydown .container': 'highlightOnkeyUp' this doesn't work
    },

    addBlock: function(e) {
        var blockData = {
            highlighted: false,
            index: this.collection.size()
        };

        this.collection.create(blockData);
    },

    addOne: function(block) {
        var view = new app.BlockView({
            model: block
        });
        $('#container').append(view.render().el);
    },

    addAll: function() {
        this.$('#container').html('');
        this.collection.each(this.addOne, this);
    },

    highlight: function(e) {
        var target = e.target;

        while (target.className != 'container') {
            if (target.className === 'galery-item') {
                this.highlightEl(target);
                return;
            }
            target = target.parentNode;
        }
    },

    highlightEl: function(element) {
        var id = parseInt(element.firstElementChild.getAttribute("id"));
        var self = this;

        if (this.selectedBlock) {
            this.selectedBlock.trigger("highlight", false);
        }

        this.collection.each(function(model) {
            if (model.get("index") === id) {
                self.selectedBlock = model;
                model.trigger("highlight", true);
            }
        });
    },

    highlightOnkeyUp: function() {
        if (!this.selectedBlock) {
            // Find first one and highlite it
            this.selectedBlock = this.collection.at(0);
            this.collection.at(0) ? this.collection.at(0).trigger("highlight", true) : undefined;
        }

        var selectedBlockWidth = document.getElementsByClassName("galery-item")[0].offsetWidth;
        var selectedBlockMarging = parseInt(getComputedStyle(document.getElementsByClassName("galery-item")[0]).marginTop);
        var containerWidth = document.getElementsByClassName("container")[0].clientWidth;
        var numOfBlocksInRow = parseInt(containerWidth / (selectedBlockWidth + selectedBlockMarging * 2));

        var selectedBlockId = this.selectedBlock.get("index");

        switch (event.keyCode) {
            case 37: // left
                var leftElem = document.getElementById(selectedBlockId - 1);
                leftElem ? this.highlightEl(leftElem.parentElement) : undefined;
                return false;
            case 38: // up
                var upperElem = document.getElementById(selectedBlockId - numOfBlocksInRow);
                upperElem ? this.highlightEl(upperElem.parentElement) : undefined;
                return false;
            case 39: // right
                var rightElem = document.getElementById(selectedBlockId + 1);
                rightElem ? this.highlightEl(rightElem.parentElement) : undefined;
                return false;
            case 40: // down
                var lowerElem = document.getElementById(selectedBlockId + numOfBlocksInRow);
                lowerElem ? this.highlightEl(lowerElem.parentElement) : undefined;
                return false;
        }
    }

});
