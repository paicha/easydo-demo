define([
  "app",
  "apps/account/app",
  "marionette",
  "apps/account/orgtree/controller",
], function(App, AccountApp, Marionette, Controller) {

  var OrgtreeApp = App.module("OrgtreeApp", {
    startWithParent: false
  });

  // 目录树是公共的部分，启动的时候先加载
  OrgtreeApp.on("start", function() {
    Controller.OrgtreeApp();
  });

  OrgtreeApp.on("stop", function() {
    App.pageleft.reset();
  });

  var OrgtreeRouter = Marionette.AppRouter.extend({

    before: function() {
      App.AccountApp.start(); // tab导航
      App.AccountApp.startSubApps("OrgtreeApp",{}); // 目录树
    },

    controller: Controller,

    appRoutes: {
      "account-orgtree": "TreeRoot", //组织结构下的页面
      "account-orgtree-ceo": "ceo" //组织结构下的页面
    }
  });

  App.addInitializer(function() {
    new OrgtreeRouter();
  });

  return OrgtreeApp;
});