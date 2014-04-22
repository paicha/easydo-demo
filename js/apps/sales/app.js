define([
  "app",
  "marionette",
  'apps/sales/tabs_view',
  'apps/sales/case/app'
], function(App, Marionette, TabsView, CaseApp) {

  var SalesApp = App.module("SalesApp", {
    startWithParent: false,
  });

  SalesApp.on("start", function() {
    controller.showSalesTabs();
  });

  SalesApp.on("stop", function() {
    App.pagetabs.reset();
    SalesApp.currentApp = ""; // 清空记录的当前应用
  });

  var controller = {
    showSalesTabs: function() {
      this.tabsview = new TabsView();
      App.pagetabs.show(this.tabsview);
      SalesApp.on("app:desks:started", this._setCurrentApp, this);
    },
    _setCurrentApp: function(appName) {
      this.tabsview.setCurrent(appName);
    }
  };

  SalesApp.startSubApps = function(appName) {
    var currentApp = App.module(appName);
    if (SalesApp.currentApp === currentApp) {
      return;
    }

    if (SalesApp.currentApp) {
      SalesApp.currentApp.stop();
    }

    SalesApp.currentApp = currentApp;
    currentApp.start();
    SalesApp.trigger("app:desks:started", appName);
  };

  return SalesApp;
});