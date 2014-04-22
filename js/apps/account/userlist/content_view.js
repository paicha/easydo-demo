define([
  'underscore',
  'marionette',
  'text!apps/account/userlist/tmpl/content.html',
], function(_, Marionette, templates) {

  return Marionette.ItemView.extend({

    className: "col-sm-8",

    template: _.template(templates),

  });

});