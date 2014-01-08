define([
    "jquery",
    "underscore",
    "backbone",
    "backboneLocalStorage",
    "../models/todo"
], function ($, _, Backbone, BackboneLocalStorage, Todo) {


    var TodoList = Backbone.Collection.extend({


        model: Todo,

        localStorage: new BackboneLocalStorage("chore-thing"),

            //Simple converter that makes the Date() format into month followed by year
            presentDate: function () {

                 var months = ['January','February','March','April','May','June','July',
                'August','September','October','November','December'];
                var tomorrow = new Date();
                tomorrow.setTime(tomorrow.getTime() + (1000*3600*24));
                var date = months[tomorrow.getMonth()] + " " + tomorrow.getDate()+ ", " + tomorrow.getFullYear();

                return date;
            },

            //Attemps to sort collection after the models cid attribute
             comparator: function(collection ){

                return( collection.cid );
            }
        });

    return TodoList;
});
