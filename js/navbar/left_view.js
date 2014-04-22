define([
  'underscore',
  'marionette',
  'text!navbar/tmpl/left.html',
  'navbar/item_view'
], function(_, Marionette, LeftTemplate, Itemview) {

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
      $('#navbar li').removeClass('active');
      $('#' + appName).tab('show');
    }

  });

});