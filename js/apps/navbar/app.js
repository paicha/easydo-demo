define([
  "app",
  "marionette",
  "apps/navbar/controller"
], function(App, Marionette, Controller) {

  var NavBarApp = App.module("NavBarApp");
  NavBarApp.controller = new Controller();

  NavBarApp.on("start", function () {
    NavBarApp.controller.showNavbar();
  });

  return NavBarApp;
});