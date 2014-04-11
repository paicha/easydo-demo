define(['apps/desks/disk/filemodel', 'app'], function (FileModel, app) {

  return Backbone.Collection.extend({
    
    model: FileModel,

    localStorage: new Backbone.LocalStorage("backbone-mar"),
    //url: app.config.apiUrl + '/users',

    parse: function (resp, options) {
      return resp;
    }
    
  });

});