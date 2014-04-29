define([
  'underscore',
  'backbone',
  'components/tree/tree_node_model'
], function(_, Backbone, TreeNode) {

  return Backbone.Collection.extend({
    model: TreeNode
  });

});