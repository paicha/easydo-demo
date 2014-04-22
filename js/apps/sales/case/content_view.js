define([
  'underscore',
  'marionette',
  'text!apps/sales/case/tmpl/content.html',
], function(_, Marionette, ContentTemplate) {

  return Marionette.ItemView.extend({

    template: _.template(ContentTemplate),
  });

});