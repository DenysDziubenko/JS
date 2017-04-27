/*global Backbone*/
/*global _*/
/*global $*/

var app = app || {};

app.BlocksView = Backbone.View.extend({
    el: '#blocksApp',
    selectedBlock: undefined,

    initialize: function() {
        this.blockIndex = 1;
        this.collection = new app.Blocks();
        this.listenTo(this.collection, 'add', this.addOne);
        //this.listenTo(this.collection, 'reset', this.addAll);
        $(document).on('keyup', this.highlightOnkeyUp.bind(this)); // workaround for the line 23
        this.collection.fetch();
    },

    events: {
        'click #button': 'addBlock',
        'click .container': 'highlight'
            // 'keydown .container': 'highlightOnkeyUp' this doesn't work
    },

    addBlock: function(e) {

        var blockData = {
            highlighted: false,
            index: this.blockIndex
        };

        var model = this.collection.create(blockData);
        model.trigger("highlight", true);
        this.blockIndex++;
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

        // TODO  highlight blocks changing the models in the collection
        // var id = parseInt(element.firstElementChild.getAttribute("id"));

        // this.collection.each(function(model) {
        //     if (model.get("index") === id) {
        //         model.save({
        //             highlighted: true
        //         });
        //     }
        // });
        // this.collection.fetch();
        // this.addAll();

        // for (var key in this.collection.models) {
        //     console.log('COLLECTION key' + key);
        //     console.dir(this.collection.models[key]);

        //     if (key) {
        //     }
        // }


        if (this.selectedBlock) {
            this.selectedBlock.classList.remove("highlited");
        }
        this.selectedBlock = element;
        this.selectedBlock.classList.add("highlited");
    },

    highlightOnkeyUp: function() {


        if (!this.selectedBlock) {
            // Find first one and highlite it
            this.highlightEl(document.getElementsByClassName("galery-item")[0]);
        }

        var selectedBlockWidth = this.selectedBlock.offsetWidth;
        var selectedBlockMarging = parseInt(getComputedStyle(this.selectedBlock).marginTop);
        var containerWidth = document.getElementsByClassName("container")[0].clientWidth;
        var numOfBlocksInRow = parseInt(containerWidth / (selectedBlockWidth + selectedBlockMarging * 2));
        var selectedBlockId = parseInt(this.selectedBlock.firstElementChild.getAttribute("id"));

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
