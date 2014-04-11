define([
  'underscore',
  'apps/navbar/model',
  'app'
], function(_, NavModel, app) {

  return Backbone.Collection.extend({

    model: NavModel,

    url: '/navbar.json',

    parse: function(resp, options) {
      return resp;
    }

  });

});