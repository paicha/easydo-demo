define([
  'underscore',
  'marionette',
  'app',
  'text!apps/account/orgtree/tmpl/item.html',
], function(_, Marionette, App, ItemTemplates) {

  return Marionette.CompositeView.extend({

    template: ItemTemplates,

    tagName: "ul",

    initialize: function() {
      // grab the child collection from the parent model
      // so that we can render the collection as children
      // of this parent node
      this.collection = this.model.nodes;
      this.on('dosomething', function(args){
        App.vent.trigger('something', args);
      });
    },

    triggers: {
      'click .do-something': 'dosomething'
    },


    appendHtml: function(collectionView, itemView) {
      // ensure we nest the child list inside of 
      // the current list item
      collectionView.$("li:first").append(itemView.el);
    }

  });

});