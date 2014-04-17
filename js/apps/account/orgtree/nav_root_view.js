define([
  'underscore',
  'marionette',
  'apps/account/orgtree/nav_node_view'
], function(_, Marionette, NavNodeView) {

  return Marionette.CollectionView.extend({

    className: "col-sm-2 navtree",

    itemView: NavNodeView

  });
});