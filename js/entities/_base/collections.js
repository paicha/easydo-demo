define([
  "app",
  "backbone"
], function(App, Backbone) {

  var Entities = App.module("Entities");
  Entities.Collection = Backbone.Collection.extend({});

});