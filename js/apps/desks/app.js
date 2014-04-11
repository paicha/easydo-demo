define([
  "app",
  "marionette",
  "apps/desks/controller",
  "apps/desks/leftview"
], function(App, Marionette, Controller, LeftView) {

  var DesksApp = App.module("DesksApp", {
    startWithParent: false,
  });

  DesksApp.on("start", function() {
    leftview = new LeftView();
    App.pageleft.show(leftview);
  });

  DesksApp.on("stop", function() {
    App.pagetabs.reset();
    App.pageleft.reset();
    App.pageright.reset();
  });

  var DesksRouter = Marionette.AppRouter.extend({

    before: function() {
      App.startSubApp("DesksApp", {});
    },

    controller: Controller,

    appRoutes: {
      "desks" : "ShowDesks",
      "desks-disk": "DiskApp",
      "desks-todo": "TodoApp",
    }
  });

  App.addInitializer(function() {
    new DesksRouter();
  });

  return DesksApp;
});