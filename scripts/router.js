define([
    "underscore",
    "backbone",
    "todo/views/main",
    "todo/collections/todoList"
    ], function (_, Backbone, MainView, TodoCollection) {

     // Basic router
    var Router = Backbone.Router.extend({


       initialize: function(){
                        var root = $("[data-main][data-root]").data("root");
                        root = root ? root : '/';
                        this.todoCollection = new TodoCollection();
                        this.mainView = new MainView();
                           Backbone.history.start({
                                pushState: true,
                                root: root
                             });

        }

        //If you want to add multi-page functionality in the future
        // routes: {
        //         '/*': 'home'

        // },

        // home: function(){
        //    this.mainView;
        // }
    });

    return Router;
});
