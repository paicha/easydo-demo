define([
  'underscore',
  'marionette',
  'text!apps/desks/todo/tmpl/content.html',
], function(_, Marionette, ContentTemplates) {

  return Marionette.ItemView.extend({

    className: "col-sm-8",

    template: _.template(ContentTemplates),

  });

});