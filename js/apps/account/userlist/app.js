define([
  "app",
  "marionette",
  "apps/account/userlist/controller",
], function(App, Marionette, Controller) {

  var UserlistApp = App.module("AccountApp.UserlistApp", {
    startWithParent: false,
  });

  var UserlistRouter = Marionette.AppRouter.extend({

    before: function() {
      App.startSubApp("AccountApp", {});
      App.AccountApp.startSubApps("AccountApp.UserlistApp");
    },

    controller: Controller,

    appRoutes: {
      "account-userlist": "UserlistApp"
    }
  });

  App.addInitializer(function() {
    new UserlistRouter();
  });

  return UserlistApp;
});