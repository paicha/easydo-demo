define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'components/tree/controller',
  'apps/account/orgtree/left_view',
  'apps/account/orgtree/node_content_view',
  'apps/account/orgtree/root_content_view'
], function(_, Marionette, Backbone, App, TreeComponent, LeftView, NodeContentView, RootContentView) {

  var Controller = {

    orgTreeApp: function() {
      // 渲染左侧栏内容
      var leftView = new LeftView();
      App.pageleft.show(leftView);

      // 初始化导航树组件
      this.treeView = new TreeComponent({
        checkable: true, // 显示复选框
        css: "js/components/tree/css/navtree.css",
        is_static: false // 是否静态
      });

      // 渲染到左侧栏特定 DOM 区域
      this.treeView.render("#orgtree");

      // 监听加载节点事件
      this.treeView.on("load", this.loadNodes);

      // 加载一级导航树
      $.when(App.request("orgtree:entities", "/orgtree.json"))
        .then(_.bind(this.showTree, this));

      // ====== Test Begin ======
      var that = this;
      // 监听点击节点事件
      this.treeView.on("clicknode", function(nodeView) {
        App.router.navigate("account-orgtree-" + nodeView.model.get('id'), {
          trigger: true
        });
      });
      // 打印勾选节点
      leftView.on('showCheckedList', function() {
        console.log(that.treeView.get_checked());
      });
      // 根据nodeid打印节点
      leftView.on('getNode', function() {
        var nodeId = prompt("输入nodeId");
        var nodeView = that.treeView.get_node(nodeId);
        console.log(nodeView);
        nodeView.activate();
      });
      // 根据nodeid展开导航树
      leftView.on('expandNode', function() {
        that.treeView.get_node_by_path([0, 1, 11], function(node) {
          node.activate();
        });
      });
      // ====== Test End ====== 
    },

    showTree: function(orgtree) {
      var treedata = orgtree; // Todo 数据转换
      // 加载数据到导航树
      this.treeView.load_nodes(treedata);
    },

    loadNodes: function(nodeView, nodeModel) {
      var load = function(data) {
        var nodeDate = data; // Todo 数据转换
        // 加载数据到导航树
        nodeView.load_nodes(data);
      };
      // 根据当前节点请求相应的URL
      var url = '/' + nodeModel.get('id') + '.json';
      $.when(App.request("orgtree:entities", url))
        .then(load);
    },

    treeNode: function(id) {
      var contentview = new NodeContentView();
      App.pagecontent.show(contentview);

      this.treeView.get_node_by_path([0, id], function(node) {
        node.activate();
      });
    },

    treeRoot: function() {
      var contentview = new RootContentView();
      App.pagecontent.show(contentview);
    }

  };

  return Controller;

});