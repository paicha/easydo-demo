define([
  'underscore',
  'marionette',
  'vent',
  'templates',
  'views/file/fileItemView',
  'views/LoadingView'
],

function (_, Marionette, vent, templates, fileItemView, LoadingView) {

  return Marionette.CompositeView.extend({

    template: _.template(templates.file.list),

    itemView: fileItemView,

    //emptyView: LoadingView,

    triggers:  {
       // FileController is listening
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