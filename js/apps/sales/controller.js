define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'apps/sales/case/contentview',
  'apps/sales/tabsview',
],

function(_, Marionette, Backbone, App, ContentView, TabsView) {

  var SalesController = {

    showSalesTabs: function() {
      tabsview = new TabsView();
      App.pagetabs.show(tabsview);
    },

    CaseApp: function() {
      tabsview = new TabsView();
      tabsview.setCurrent('sales-case');
      contentview = new ContentView();
      App.pagecontent.show(contentview);
    },

  };

  return SalesController;

});