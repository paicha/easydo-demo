define([
  'underscore',
  'marionette',
  'text!apps/desks/disk/tmpl/item.html'
], function(_, Marionette, ItemTemplate) {

  return Marionette.ItemView.extend({

    tagName: 'tr',

    template: _.template(ItemTemplate),

    triggers: {
      // UserController is listening
      'click .delete': 'file:delete'
    },

    initialize: function() {
      this.listenTo(this.model, "change", this.render, this);
      this.listenTo(this.model, "destroy", this.render, this);
    }

  });

});