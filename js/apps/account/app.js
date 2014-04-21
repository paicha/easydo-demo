define([
  "app",
  "marionette",
  'apps/account/tabsview',
  'apps/account/userlist/app',
  'apps/account/orgtree/app'
], function(App, Marionette, TabsView, UserlistApp, OrgtreeApp) {

  var AccountApp = App.module("AccountApp", {
    startWithParent: false,
  });

  AccountApp.on("start", function() {
    App.startSubApp("AccountApp", {});
    Controller.showAccountTabs();
  });

  AccountApp.on("stop", function() {
    App.pagetabs.reset();
  });

  var Controller = {
    showAccountTabs: function() {
      this.tabsview = new TabsView();
      App.pagetabs.show(this.tabsview);
      AccountApp.on("app:account:started", this._setCurrentApp, this);
    },
    _setCurrentApp: function(appName) {
      this.tabsview.setCurrent(appName);
    }
  };

  AccountApp.startSubApps = function(appName, args) {
  var currentApp = App.module(appName);
    if (AccountApp.currentApp === currentApp) {
      return;
    }

    if (AccountApp.currentApp) {
      AccountApp.currentApp.stop();
    }

    AccountApp.currentApp = currentApp;
    currentApp.start(args);
    //App.module(appName).start();
    AccountApp.trigger("app:account:started", appName);
  };

  return AccountApp;
});