

define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/todoTemplate.jade'
    ], function ($, _, Backbone, todoTemplate) {

    var todoView = Backbone.View.extend({


        tagName:  "li",


        events: {
            "dblclick #label"  : "edit",
            "click a.destroy" : "clear",
            "keypress .edit"  : "updateOnEnter",
            "blur .edit"      : "close",
            "click a.btn.pull-right": "choreDone"
        },

        //Compiles to jade-templating. Makes sure the model listens to delete and edit events
        initialize: function () {
            this.template = jade.compile(todoTemplate);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },

        // Renders the components of my todo-item, making sure the commands are available in my template
        render: function () {

          $(this.el).html(this.template({
                title: this.model.get('title'),
                done: this.model.get('done'),
                order: this.model.get('order'),
                date: this.model.get('date')
            }));

            this.input = this.$('.edit');
            this.$el.toggleClass('done', this.model.get('done'));

            if(this.model.get('done') ==  true)
            {
                this.$el.find(".btn.pull-right").hide();
            }
            return this;
        },



        // Editing mode for the item, shows the edit div, hides the content div.
        edit: function () {
            if(this.model.get('done') ==  false)
            {
            this.$el.find(".edit").show();
            this.$el.find("#content").hide();
            this.$el.addClass("editing");
            this.input.focus();
            }
        },

        // Either removes item if input field is empty in editing mode, or saves with the new title data.
        close: function () {
            var value = this.input.val();
                if (!value) {
                    this.clear();
                }
                else {
                    this.model.save({title: value});
                    this.$el.removeClass("editing");
                }
        },

        // Simply closes current window once enter is pressed in editing mode
        updateOnEnter: function (e) {
            if (e.keyCode === 13) {
                this.close();
            }
        },

        // Destroys current model item and removes from collection
        clear: function () {
            this.model.destroy();
        },

        //Simply renders the item attribute "done" to true
        choreDone: function () {
             var view = this.model;
                this.model.save({done: true});
        }

    });
    return todoView;

});


