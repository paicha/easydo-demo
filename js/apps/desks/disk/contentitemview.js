define([
  'underscore',
  'marionette',
  'apps/desks/disk/templates'
],

function (_, Marionette, templates) {

  return Marionette.ItemView.extend({

    tagName: 'tr',

    template: _.template(templates.item),

    triggers:  {
      // UserController is listening
      'click .delete' : 'file:delete'
    },

    initialize: function() {
      this.listenTo(this.model, "change", this.render, this);
      this.listenTo(this.model, "destroy", this.render, this);
    }

  });
  
});