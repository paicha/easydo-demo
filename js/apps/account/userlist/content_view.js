define([
  'underscore',
  'marionette',
  'text!apps/account/userlist/tmpl/content.html',
], function(_, Marionette, templates) {

  return Marionette.ItemView.extend({

    template: _.template(templates),

  });

});