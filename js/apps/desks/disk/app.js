define([
  "app",
  "marionette",
  "apps/desks/disk/controller",
], function(App, Marionette, Controller) {

  var DiskApp = App.module("DesksApp.DiskApp", {
    startWithParent: false
  });

  DiskApp.on("stop", function() {
    App.pageright.reset();
  });

  var DiskRouter = Marionette.AppRouter.extend({

    before: function() {
      App.startSubApp("DesksApp", {});
      App.DesksApp.startSubApps("DesksApp.DiskApp");
    },

    controller: Controller,

    appRoutes: {
      "desks-disk": "DiskApp"
    }
  });

  App.addInitializer(function() {
    new DiskRouter();
  });

  return DiskApp;
});