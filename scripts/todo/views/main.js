

define([
    'jquery',
    'underscore',
    'backbone',
    '../collections/todoList',
    './todoView',

    ],
    function ($, _, Backbone, TodoCollection, TodoView) {

    var mainView = Backbone.View.extend({
        //If we want to, we can switch to more dynamic approach to "el" while loading page.
        el: $("#todocontainer"),

        events: {
                "keypress #new-todo":  "createOnEnter",

        },

        //Gets existing items in localStorage, binds to collection.
        initialize: function() {

            this.Todo = new TodoCollection();
            this.input = this.$("#new-todo");
            this.listenTo(this.Todo, 'add', this.addOne);
            this.main = $('#main');
            this.Todo.fetch();
        },

        //Checks whether Todo has any content, if not hide main-element
        render: function() {

               if (this.Todo.length) {
                    this.main.show();
                } else {
                    this.main.hide();
                }
            },

          //On enter, and if input isn't empty, creates Todo-item where the attribute title gets saved with what's in the input field.
          createOnEnter: function(e) {

            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            this.Todo.create({title: this.input.val()});
            this.input.val('');
        },

         //Adds the todo item to the model and appends to the list element on the HTML-page.
        addOne: function(todo) {

            var view = new TodoView({model: todo});
            this.$("#todo-list").append(view.render().el);
        }
    });
    return mainView;
});
