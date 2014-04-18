define([
  "app",
  "marionette",
  "apps/account/userlist/controller",
], function(App, Marionette, Controller) {

  // 页面没有公共内容 不需要 Module
  /*var userlistApp = App.module("AccountApp.userlistApp", {
    startWithParent: false,
  });*/

  var UserlistRouter = Marionette.AppRouter.extend({

    before: function() {
      App.AccountApp.start();
      //App.startSubApp("AccountApp", {});
    },

    controller: Controller,

    appRoutes: {
      "account-userlist": "userlistApp"
    }
  });
  
  // 路由是入口 如果整个 App 初始化的时候不实例化，相当于整个网站没有这个 url
  // App.AccountApp.addInitializer
  App.addInitializer(function() {
    new UserlistRouter();
  });

  //return userlistApp;
});