define([
  "app"
], function(App) {

  var API = {

    getAll: function(url) {
      var deferred = $.Deferred();

      this._getTree(function(data) {
        deferred.resolve(data);
      }, url);

      return deferred.promise();
    },

    _getTree: function(callback, url) {
      $.get(url, function(data) {
        callback(data);
      });
    }
  };

  App.reqres.setHandler("orgtree:entities", function(url) {
    return API.getAll(url);
  });

});