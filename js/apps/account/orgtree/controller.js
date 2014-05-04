define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'components/tree/controller',
  'apps/account/orgtree/left_view',
  'apps/account/orgtree/ceo_content_view',
  'apps/account/orgtree/root_content_view'
], function(_, Marionette, Backbone, App, TreeComponent, LeftView, CeoContentView, RootContentView) {

  var Controller = {

    orgTreeApp: function() {
      // 渲染左侧栏内容
      var leftView = new LeftView();
      App.pageleft.show(leftView);

      // 初始化导航树组件
      this.treeView = new TreeComponent({
        checkable: true, // 显示复选框
      });

      // 渲染到左侧栏特定 DOM 区域
      this.treeView.render("#orgtree");

      // 监听加载节点事件
      this.treeView.on("load", this.loadNodes);

      // 监听点击节点事件
      var that = this;
      this.treeView.on("clicknode", function(nodeView) {
        // 得到当前激活项
        console.log(that.treeView.get_activated());
      });

      // 得到当前勾选
      leftView.on('showCheckedList', function(){
        console.log(that.treeView.get_checked());
      });

      // 加载一级导航树
      $.when(App.request("orgtree:entities", "/orgtree.json"))
        .then(_.bind(this.showTree, this));
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

    ceo: function() {
      var contentview = new CeoContentView();
      App.pagecontent.show(contentview);
    },

    treeRoot: function() {
      var contentview = new RootContentView();
      App.pagecontent.show(contentview);
    }

  };

  return Controller;

});