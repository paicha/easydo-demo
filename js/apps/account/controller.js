define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'apps/account/orgtree/contentview',
  'apps/account/tabsview',
  'apps/account/orgtree/leftview'
], function(_, Marionette, Backbone, App, ContentView, TabsView, LeftView) {

  var AccountController = {

    showAccountTabs: function() {
      this.tabsview = new TabsView();
      App.pagetabs.show(this.tabsview);
      App.vent.on("app:started", this._setCurrentApp, this);
    },

    OrgtreeApp: function() {
      leftview = new LeftView();
      contentview = new ContentView();

      App.pageleft.show(leftview);
      App.pagecontent.show(contentview);
    },

    _setCurrentApp: function(appName) {
      this.tabsview.setCurrent(appName);
    },

  };

  return AccountController;

});