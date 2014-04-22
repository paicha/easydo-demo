define([
  'underscore',
  'marionette',
  'text!apps/desks/disk/tmpl/list.html',
  'apps/desks/disk/content_item_view',
], function(_, Marionette, ListTemplate, ContentItemView) {

  return Marionette.CompositeView.extend({

    template: _.template(ListTemplate),

    itemView: ContentItemView,

    triggers: {
      'click .create': 'file:create',
      'click .createFolder': 'file:createFolder'
    },

    events: {

    },

    appendHtml: function(collectionView, itemView) {
      collectionView.$("tbody").append(itemView.el);
    },


  });

});