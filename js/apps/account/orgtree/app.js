define([
  "app",
  "marionette",
  "apps/account/orgtree/controller",
], function(App, Marionette, Controller) {

  var OrgtreeApp = App.module("AccountApp.OrgtreeApp", {
    startWithParent: false
  });

  OrgtreeApp.on("start", function() {
    var treeView = Controller.orgTreeApp();
    App.pageleft.show(treeView);
  });

  OrgtreeApp.on("stop", function() {
    App.pageleft.reset();
  });

  var OrgtreeRouter = Marionette.AppRouter.extend({

    before: function() {
      App.startSubApp("AccountApp", {});
      App.AccountApp.startSubApps("AccountApp.OrgtreeApp");
    },

    controller: Controller,

    appRoutes: {
      "account-orgtree": "treeRoot",
      "account-orgtree-ceo": "ceo"
    }
  });

  App.addInitializer(function() {
    new OrgtreeRouter();
  });

  return OrgtreeApp;
});