define([
  'app',
], function(app, NavModel) {

  return Backbone.Collection.extend({

    url: '/navbar.json',

    parse: function(resp, options) {
      return resp;
    }

  });

});