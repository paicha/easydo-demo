define([
  'backbone',
  'marionette',
  'navbar/controller'
], function(Backbone, Marionette, NavController) {

  var App = new Marionette.Application();

  var ModalRegion = Marionette.Region.extend({
    el: "#modal",

    onShow: function(view) {
      view.on("close", this.hideModal, this);
      this.$el.modal('show');
    },

    hideModal: function() {
      this.$el.modal('hide');
    }
  });

  App.addRegions({
    navbar: "#navbar",
    pagetabs: "#page-tabs",
    pageleft: "#page-left",
    pagecontent: "#page-content",
    pageright: "#page-right",
    modal: ModalRegion
  });

  App.addInitializer(function() {
    navController = new NavController();
    navController.showNavbar();
    App.vent.on("app:started", navController.setCurrentApp, navController);
  });

  App.on("initialize:after", function() {
    if (Backbone.history) {
      Backbone.history.start();
    }
  });

  App.startSubApp = function(appName, args) {
    var currentApp = App.module(appName);
    if (App.currentApp === currentApp) {
      return;
    }

    if (App.currentApp) {
      App.currentApp.stop();
    }

    App.currentApp = currentApp;
    currentApp.start(args);
    App.vent.trigger("app:started", appName);
  };

  return App;
});