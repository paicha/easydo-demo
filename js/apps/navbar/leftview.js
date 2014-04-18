define([
  'underscore',
  'marionette',
  'text!apps/navbar/tmpl/left.html',
  'text!apps/navbar/tmpl/item.html',
  'apps/navbar/navcollection',
  'apps/navbar/itemview'
], function(_, Marionette, LeftTemplate, ItemTemplate, Collection, Itemview) {

  return Marionette.CompositeView.extend({

    template: _.template(LeftTemplate),

    itemView: Itemview,

    appendHtml: function(collectionView, itemView, index) {
      if (index < 3) {
        collectionView.$(".dropdown").before(itemView.el);
      } else {
        collectionView.$(".dropdown-menu").append(itemView.el);
      }
      // 当出现第4个导航时，显示下拉导航
      if (index == 3) {
        collectionView.$(".dropdown").removeClass("hidden");
      }
    },

    setCurrent: function(appName) {
      $('#' + appName).tab('show');
    }

  });

});