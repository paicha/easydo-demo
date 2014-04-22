define([
  'underscore',
  'marionette',
  'backbone',
  'apps/account/tabs/tabs_view',
], function(_, Marionette, Backbone, TabsView) {

  var Controller = Marionette.Controller.extend({
    showTabs: function(regions) {
      this.tabsview = new TabsView();
      regions.show(this.tabsview);
    },
    setCurrentApp: function(appName) {
      this.tabsview.setCurrent(appName);
    }
  });

  return Controller;

});