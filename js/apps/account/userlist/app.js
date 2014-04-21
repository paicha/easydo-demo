define([
  "app",
  "marionette",
  "apps/account/userlist/controller",
], function(App, Marionette, Controller) {

  var userlistApp = App.module("UserlistApp", {
    startWithParent: false,
  });

  var UserlistRouter = Marionette.AppRouter.extend({

    before: function() {
      App.AccountApp.start(); // tabs导航
      App.AccountApp.startSubApps("UserlistApp", {});
    },

    controller: Controller,

    appRoutes: {
      "account-userlist": "userlistApp"
    }
  });

  App.addInitializer(function() {
    new UserlistRouter();
  });

  return userlistApp;
});