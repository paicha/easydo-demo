define([
  'underscore',
  'backbone',
  'apps/account/orgtree/tree_node_model'
], function(_, Backbone, TreeNode) {

  return Backbone.Collection.extend({
    model: TreeNode
  });

});