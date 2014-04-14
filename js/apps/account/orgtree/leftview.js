define([
  'underscore',
  'marionette',
  'text!apps/account/orgtree/tmpl/left.html',
], function(_, Marionette, LeftTemplates) {

  return Marionette.ItemView.extend({

    className: "col-sm-2",

    template: _.template(LeftTemplates),
  });

});