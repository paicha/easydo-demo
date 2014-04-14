define([
  "app",
  "marionette",
  "apps/account/controller",
], function(App, Marionette, Controller) {

  var AccountApp = App.module("AccountApp", {
    startWithParent: false,
  });

  AccountApp.on("start", function() {
    Controller.showAccountTabs();
  });

  AccountApp.on("stop", function() {
    App.pagetabs.reset();
  });

  var AccountRouter = Marionette.AppRouter.extend({

    before: function() {
      App.startSubApp("AccountApp", {});
    },

    controller: Controller,

    appRoutes: {
      "account-orgtree": "OrgtreeApp"
    }
  });

  App.addInitializer(function() {
    new AccountRouter();
  });

  return AccountApp;
});