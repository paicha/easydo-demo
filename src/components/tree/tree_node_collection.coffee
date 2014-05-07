define [
  'underscore'
  'backbone'
  'components/tree/tree_node_model'
], (_, Backbone, TreeNode) ->

  Backbone.Collection.extend model: TreeNode