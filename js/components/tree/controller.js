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
      this.css = options.css;
      this.is_static = options.is_static;

      this.treeView = new NavRootView({
        collection: new TreeNodeCollection(),
        controller: this,
      });

      // 加载 css
      this.treeView.loadCss(this.css);

      // 初始化保存 当前勾选节点 的变量
      this.checkedNode = {};
      // 初始化保存 已加载节点 的变量
      this.nodeList = {};
    },

    // 加载根节点
    load_nodes: function(data) {
      this.treeView.collection.add(data);
      this.treeView.collapse(this);
      if (this.loaded_callback) {
        this.loaded_callback(this);
        this.loaded_callback = null;
      }
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

    // 根据 node_id 返回对应的 view
    get_node: function(node_id) {
      return this.nodeList[node_id];
    },

    _onGotNode: function(node) {
      // 迭代
      if (this.node_ids.length === 0) {
        this.on_loaded(node);
      } else {
        var that = this.that;
        var _gotNode = _.bind(that._onGotNode, {
          'on_loaded': this.on_loaded,
          'that': that,
          "node_ids": this.node_ids.slice(1)
        });
        next_node = that.get_node(this.node_ids[0]);
        next_node.expand(_gotNode);
      }
    },

    // 根据 node_ids 循环展开对应的节点
    get_node_by_path: function(node_ids, on_loaded) {
      var _gotNode = _.bind(this._onGotNode, {
        'on_loaded': on_loaded,
        'that': this,
        "node_ids": node_ids
      });

      if (!this.treeView.collection.length) {
        this.loaded_callback = _gotNode;
      } else {
        _gotNode(this);
      }
    }
  });

  return Controller;
});