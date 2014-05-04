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
      // 初始化组件
      this.checkable = options.checkable;
      this.treeView = new NavRootView({
        collection: new TreeNodeCollection(),
        controller: this,
      });

      // 加载 css
      this.treeView.loadCss();

      // 初始化保存当前勾选节点的变量
      this.checkedNode = {};
    },

    // 加载子节点
    load_nodes: function(data) {
      this.treeView.collection.add(data);
      this.treeView.collapse(this);
    },

    // 渲染初始化后的导航树
    render: function(dom) {
      this.treeView.render();
      $(dom).html(this.treeView.el);
    },

    // 返回已勾选节点对象
    get_checked: function() {
      return this.checkedNode;
    },

    // 返回当前激活节点的 view
    get_activated: function() {
      return this.currentNode;
    },

  });

  return Controller;
});