define([
  "app",
  "marionette",
  'apps/account/tabs_view',
  'apps/account/userlist/app',
  'apps/account/orgtree/app'
], function(App, Marionette, TabsView, UserlistApp, OrgtreeApp) {

  var AccountApp = App.module("AccountApp", {
    startWithParent: false,
  });

  AccountApp.on("start", function() {
    controller.showAccountTabs();
  });

  AccountApp.on("stop", function() {
    App.pagetabs.reset();
    AccountApp.currentApp = ""; // 清空记录的当前应用
  });

  var controller = {
    showAccountTabs: function() {
      this.tabsview = new TabsView();
      App.pagetabs.show(this.tabsview);
      AccountApp.on("app:account:started", this._setCurrentApp, this);
    },
    _setCurrentApp: function(appName) {
      this.tabsview.setCurrent(appName);
    }
  };

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