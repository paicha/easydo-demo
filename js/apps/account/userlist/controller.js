define([
  'underscore',
  'marionette',
  'app',
  'apps/account/userlist/content_view'
], function(_, Marionette, App, ContentView) {

  var Controller = {

    UserlistApp: function() {
      contentview = new ContentView();
      App.pagecontent.show(contentview);
      App.pageleft.close();
      App.pageright.close();
    }

  };

  return Controller;

});