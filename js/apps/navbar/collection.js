define([
  'app',
  'apps/navbar/model'
], function(app, NavModel) {

  return Backbone.Collection.extend({

    model: NavModel,
    
    url: '/navbar.json',

    parse: function(resp, options) {
      return resp;
    }

  });

});