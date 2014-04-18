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
    Controller.showAccountTabs();
  });

  AccountApp.on("stop", function() {
    App.pagetabs.reset();
  });

  var Controller = {
    showAccountTabs: function() {
      this.tabsview = new TabsView();
      App.pagetabs.show(this.tabsview);
      App.vent.on("app:started", this._setCurrentApp, this);
    },
    _setCurrentApp: function(appName) {
      this.tabsview.setCurrent(appName);
    }
  };

  return AccountApp;
});