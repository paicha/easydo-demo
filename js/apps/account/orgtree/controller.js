define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'apps/account/orgtree/content_view',
  'apps/account/orgtree/ceo_content_view',
  'apps/account/orgtree/root_content_view',
  'apps/account/orgtree/tree_node_collection',
  'apps/account/orgtree/nav_root_view',
  'apps/account/orgtree/tree_node_model'
], function(_, Marionette, Backbone, App, ContentView, CeoContentView, RootContentView, TreeNodeCollection, NavRootView, TreeNode) {

  var Controller = {

    orgTreeApp: function() {

      this.tree = new TreeNodeCollection();
      this.tree.url = "/orgtree.json";
      this.tree.fetch({
        success: function() {
          // 加载后，所有父节点增加加号图标与title
          $('#page-left li > span').attr('title', '展开').addClass('icon-plus');
          // 第一级节点，改为减号图标
          $('#page-left li > span').first().attr('title', '折叠').addClass('icon-minus').removeClass('icon-plus');
        }
      });

      var treeView = new NavRootView({
        collection: this.tree
      });

      var subdata = function(id) {
        return [{
            "nodeName": "总裁",
            "nodes": []
          }, {
            "nodeName": id,
            "nodes": []
          }, {
            "nodeName": "总经理",
            "nodes": []
          }];
      };

      var clickicon = function(args) {
        var el = args.view.el.children;
        // 得到子节点长度
        var ul = $(el).find('ul').length;
        // 如果有子节点
        if (ul) {
          // 获取子节点
          var children = $(el).find(' > ul > li');
          // 如果子节点是可视状态
          if (children.is(":visible")) {
            // 隐藏
            children.hide('fast');
            // 更新父节点 title 与 图标
            $(el).find('>span').attr('title', '展开').addClass('icon-plus').removeClass('icon-minus');
          } else { // 如果三级节点是隐藏状态
            // 显示子节点
            children.show('fast');
            // 更新父节点 title & 图标
            $(el).find('>span').attr('title', '折叠').addClass('icon-minus').removeClass('icon-plus');
          }
        } else { // 如果没有子节点
          // 加载子节点
          var subdataId = args.model.get("id");
          //subnodes = new TreeNode(subdata(subdataid));
          args.collection.add(subdata(subdataId));
          // args.collection.add(subnodes1, subnodes2]);
          // 父节点 改为展开图标
          $(el).find('>span').attr('title', '折叠').addClass('icon-minus').removeClass('icon-plus');
          // 子节点 改为用户图标
          $(el).find('ul .icon-home').addClass('icon-user').removeClass('icon-home');
        }
      };
      App.vent.on("click:icon", clickicon);
      
      return treeView;
    },

    ceo: function(){
      var contentview = new CeoContentView();
      App.pagecontent.show(contentview);
    },

    treeRoot: function(){
      var contentview = new RootContentView();
      App.pagecontent.show(contentview);
    }

  };

  return Controller;

});