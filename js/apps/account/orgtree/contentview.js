define([
  'underscore',
  'marionette',
  'text!apps/account/orgtree/tmpl/content.html',
], function(_, Marionette, OrgtreeTemplates) {

  return Marionette.ItemView.extend({

    template: _.template(OrgtreeTemplates),
  });

});