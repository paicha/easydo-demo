define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'apps/sales/case/content_view'
], function(_, Marionette, Backbone, App, ContentView) {

  var controller = {

    CaseApp: function() {
      contentview = new ContentView();
      App.pagecontent.show(contentview);
    }

  };

  return controller;

});