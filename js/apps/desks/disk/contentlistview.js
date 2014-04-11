define([
  'underscore',
  'marionette',
  'apps/desks/disk/templates',
  'apps/desks/disk/contentitemview',
],

function (_, Marionette, templates, ContentItemView) {

  return Marionette.CompositeView.extend({

    template: _.template(templates.list),

    itemView: ContentItemView,

    triggers:  {
      'click .create'      : 'file:create',
      'click .createFolder'      : 'file:createFolder'
    },

    events: {
      
    },

    appendHtml: function(collectionView, itemView) {
      collectionView.$("tbody").append(itemView.el);
    },


  });

});