define([
  'underscore',
  'marionette',
  'text!apps/navbar/tmpl/layout.html'
], function(_, Marionette, LayoutTemplate) {

  return Marionette.Layout.extend({

    template: _.template(LayoutTemplate),

    regions: {
      left: "#nav-left",
      right: "#nav-right"
    },

  });
});