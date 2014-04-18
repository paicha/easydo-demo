define([
  "app",
  "marionette",
  "apps/account/orgtree/controller",
], function(App, Marionette, Controller) {

  var OrgtreeApp = App.module("OrgtreeApp", {
    startWithParent: false
  });

  // 目录树是公共的部分，启动的时候先加载
  OrgtreeApp.on("start", function() {
    Controller.OrgtreeApp();
  });

  var OrgtreeRouter = Marionette.AppRouter.extend({

    before: function() {
      App.AccountApp.start(); // tab导航
      App.startSubApp("OrgtreeApp", {}); // 目录树
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