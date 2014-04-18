define([
  'underscore',
  'marionette',
  'app',
  'apps/account/userlist/contentview'
], function(_, Marionette, App, ContentView) {

  var UserlistController = {

    userlistApp: function() {
      contentview = new ContentView();
      App.pagecontent.show(contentview);
    }

  };

  return UserlistController;

});