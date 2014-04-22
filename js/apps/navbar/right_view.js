define([
  'underscore',
  'marionette',
  'text!apps/navbar/tmpl/right.html'
], function(_, Marionette, RightTemplate) {

  return Marionette.CompositeView.extend({

    template: _.template(RightTemplate),

    events: {
      'click #nav-edit': 'nav-edit',
    },

    initialize: function(options) {
      _.bindAll(this);
    },
  });
});