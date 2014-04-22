define([
  "app",
  "marionette",
  'apps/account/tabs/controller',
  'apps/account/userlist/app',
  'apps/account/orgtree/app'
], function(App, Marionette, Controller, UserlistApp, OrgtreeApp) {

  var AccountApp = App.module("AccountApp", {
    startWithParent: false,
  });

  AccountApp.on("start", function() {
    var controller = new Controller();
    controller.showTabs(App.pagetabs);
    AccountApp.on("app:account:started", controller.setCurrentApp, controller);
  });

  AccountApp.on("stop", function() {
    App.pagetabs.reset();
    AccountApp.currentApp = ""; // 清空记录的当前应用
  });

  AccountApp.startSubApps = function(appName) {
    var currentApp = App.module(appName);
    if (AccountApp.currentApp === currentApp) {
      return;
    }

    if (AccountApp.currentApp) {
      AccountApp.currentApp.stop();
    }

    AccountApp.currentApp = currentApp;
    currentApp.start();
    AccountApp.trigger("app:account:started", appName);
  };

  return AccountApp;
});