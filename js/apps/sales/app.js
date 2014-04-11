define([
  "app",
  "marionette",
  "apps/sales/controller",
], function(App, Marionette, Controller) {

  var SalesApp = App.module("SalesApp", {
    startWithParent: false,
  });

  SalesApp.on("start", function() {
    Controller.showSalesTabs();
  });

  SalesApp.on("stop", function() {
    App.pagetabs.reset();
  });

  var SalesRouter = Marionette.AppRouter.extend({

    before: function() {
      App.startSubApp("SalesApp", {});
    },

    controller: Controller,

    appRoutes: {
      "sales": "showSalesTabs",
      "sales-case": "CaseApp"
    }
  });

  App.addInitializer(function() {
    new SalesRouter();
  });

  return SalesApp;
});