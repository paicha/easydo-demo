define([
  "app",
  "marionette",
  "apps/sales/case/controller",
], function(App, Marionette, Controller) {

  var CaseApp = App.module("SalesApp.CaseApp", {
    startWithParent: false
  });

  var CaseRouter = Marionette.AppRouter.extend({

    before: function() {
      App.startSubApp("SalesApp", {});
      App.SalesApp.startSubApps("SalesApp.CaseApp");
    },

    controller: Controller,

    appRoutes: {
      "sales-case": "CaseApp"
    }
  });

  App.addInitializer(function() {
    new CaseRouter();
  });

  return CaseApp;
});