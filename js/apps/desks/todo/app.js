define([
  "app",
  "marionette",
  "apps/desks/todo/controller",
], function(App, Marionette, Controller) {

  var TodoApp = App.module("DesksApp.TodoApp", {
    startWithParent: false
  });

  var TodoRouter = Marionette.AppRouter.extend({

    before: function() {
      App.startSubApp("DesksApp", {});
      App.DesksApp.startSubApps("DesksApp.TodoApp");
    },

    controller: Controller,

    appRoutes: {
      "desks-todo": "TodoApp"
    }
  });

  App.addInitializer(function() {
    new TodoRouter();
  });

  return TodoApp;
});