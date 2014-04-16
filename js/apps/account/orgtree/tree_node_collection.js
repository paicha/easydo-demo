define([
  'underscore',
  'backbone',
  'apps/account/orgtree/treenode'
], function(_, Backbone, TreeNode) {

  return Backbone.Collection.extend({
    model: TreeNode
  });

});