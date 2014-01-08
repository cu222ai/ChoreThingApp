
define(["jquery", "underscore", "backbone", "../collections/todoList"], function ($, _, Backbone, TodoCollection) {


    var Todo = Backbone.Model.extend({

        // Item structure
        defaults: function () {
            return {
                title: " ",
                done: false,
                date: this.presentDate()
            };
        },

                //Simple converter that makes the Date() format into month followed by year
            presentDate: function () {

                 var months = ['January','February','March','April','May','June','July',
                'August','September','October','November','December'];
                var tomorrow = new Date();
                tomorrow.setTime(tomorrow.getTime() + (1000*3600*24));
                var date = months[tomorrow.getMonth()] + " " + tomorrow.getDate()+ ", " + tomorrow.getFullYear();

                return date;
            },

        // Makes sure every item has a title
        initialize: function () {
            if (!this.get("title")) {
                this.set({"title": this.defaults().title});
            }
        }


    });

    return Todo;
});
