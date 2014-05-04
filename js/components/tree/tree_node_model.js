define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  return Backbone.Model.extend({
    initialize: function() {
      var nodes = this.get("nodes");
      if (nodes) {
        TreeNodeCollection = require('components/tree/tree_node_collection');
        this.nodes = new TreeNodeCollection(nodes);
        this.unset("nodes");
      }
    }

  });

});