define([
  'backbone'
], function(Backbone) {

  return Backbone.Model.extend({
    defaults: {
      title: "",
      admin: "",
      tag: "",
      size: "",
      update: ""
    }

  });

});