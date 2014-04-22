define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'apps/desks/todo/content_view'
], function(_, Marionette, Backbone, App, ContentView) {

  var controller = {

    TodoApp: function() {
      var contentview = new ContentView();
      App.pagecontent.show(contentview);
    }
  };

  return controller;

});