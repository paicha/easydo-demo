define([
  "app",
  "marionette",
  "apps/desks/left_view",
  "apps/desks/disk/app",
  "apps/desks/todo/app"
], function(App, Marionette, LeftView, DiskApp, TodoApp) {

  var DesksApp = App.module("DesksApp", {
    startWithParent: false,
  });

  DesksApp.on("start", function() {
    controller.showDesksApp();
  });

  DesksApp.on("stop", function() {
    App.pagetabs.reset();
    App.pageleft.reset();
    App.pageright.reset();
    DesksApp.currentApp = ""; // 清空记录的当前应用
  });

  var controller = {
    showDesksApp: function() {
      this.leftview = new LeftView();
      App.pageleft.show(this.leftview);
      DesksApp.on("app:desks:started", this._setCurrentApp, this);
    },
    _setCurrentApp: function(appName) {
      this.leftview.setCurrent(appName);
    }
  };

  DesksApp.startSubApps = function(appName) {
    var currentApp = App.module(appName);
    if (DesksApp.currentApp === currentApp) {
      return;
    }

    if (DesksApp.currentApp) {
      DesksApp.currentApp.stop();
    }

    DesksApp.currentApp = currentApp;
    currentApp.start();
    DesksApp.trigger("app:desks:started", appName);
  };

  return DesksApp;
});