define([
  'underscore',
  'marionette',
  'backbone',
  'components/tree/nav_root_view',
  'components/tree/tree_node_collection',
  'components/tree/tree_node_model'
], function(_, Marionette, Backbone, NavRootView, TreeNodeCollection, TreeNodeModel) {

  var Controller = Marionette.Controller.extend({

    initialize: function(options) {
      this.checkable = options.checkable;
      this.treeView = new NavRootView({
        collection: new TreeNodeCollection(),
        controller: this,
      });
    },

    load_nodes: function(data) {
      this.treeView.collection.add(eval(data));
    },

    render: function(dom) {
      this.treeView.render();
      this.treeView.hiddenNodes(this);
      $(dom).html(this.treeView.el);
    },

    get_checked: function() {
      if (this.options.checked) {
        alert(checked);
      }
    },

    get_activated: function() {

    },

  });

  return Controller;
});