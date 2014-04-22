define([
  'apps/desks/disk/file_model',
], function(FileModel) {

  return Backbone.Collection.extend({

    model: FileModel,

    localStorage: new Backbone.LocalStorage("backbone-mar"),

    parse: function(resp, options) {
      return resp;
    }

  });

});