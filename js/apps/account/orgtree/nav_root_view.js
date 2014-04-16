define([
  'underscore',
  'marionette',
  'apps/account/orgtree/nav_node_view'
], function(_, Marionette, NavNodeView) {

  return Marionette.CollectionView.extend({

    itemView: NavNodeView

  });
});