define([
  "app",
  "backbone",
  "entities/_base/collections",
  "entities/_base/models"
], function(App, Backbone, EntitiesCollections, EntitiesModels) {

  var NavModel = App.Entities.Model.extend({});

  var NavbarCollection = App.Entities.Collection.extend({
    model: NavModel,
    url: "/navbar.json"
  });

  var API = {

    getAll: function() {
      var deferred = $.Deferred();

      this._getNavbar(function(navbarCollection) {
        deferred.resolve(navbarCollection);
      });

      return deferred.promise();
    },

    _getNavbar: function(callback) {
      var navbarCollection = new NavbarCollection();
      navbarCollection.on("reset", callback);
      navbarCollection.fetch({
        reset: true
      });
    }
  };

  App.reqres.setHandler("navbar:entities", function() {
    return API.getAll();
  });

});