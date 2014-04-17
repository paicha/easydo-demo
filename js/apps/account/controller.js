define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'apps/account/orgtree/contentview',
  'apps/account/tabsview',
  'apps/account/orgtree/tree_node_collection',
  'apps/account/orgtree/nav_root_view',
  'apps/account/orgtree/treenode'
], function(_, Marionette, Backbone, App, ContentView, TabsView, TreeNodeCollection, NavRootView, TreeNode) {

  var AccountController = {

    showAccountTabs: function() {
      this.tabsview = new TabsView();
      App.pagetabs.show(this.tabsview);
      App.vent.on("app:started", this._setCurrentApp, this);
    },

    OrgtreeApp: function() {

      treeData = [{
        "nodeName": "测试站点",
        "id": "i",
        "nodes": [{
          "nodeName": "总裁办",
          "id": "2",
          "nodes": []
        }, {
          "nodeName": "财务部",
          "id": "3",
          "nodes": []
        }, {
          "nodeName": "人力资源部",
          "id": "4",
          "nodes": []
        }, {
          "nodeName": "客户服务部",
          "id": "5",
          "nodes": []
        }, {
          "nodeName": "市场开发部",
          "id": "6",
          "nodes": []
        }, {
          "nodeName": "培训管理部",
          "id": "7",
          "nodes": []
        }, {
          "nodeName": "公关部",
          "id": "8",
          "nodes": []
        }, {
          "nodeName": "行政部",
          "id": "9",
          "nodes": []
        }]
      }];


      this.tree = new TreeNodeCollection(treeData);
      var treeView = new NavRootView({
        collection: this.tree
      });

      var subdata = function(id){
        return {"nodeName": id,
        "nodes": []};
      };

      var dosomething = function(args) {
        // 得到子节点长度
        ul = $(args.view.el.children).find('ul').length;
        // 如果有子节点
        if (ul) {
          // 获取子节点
          children = $(args.view.el.children).find(' > ul > li');
          // 如果子节点是可视状态
          if (children.is(":visible")) {
            // 隐藏
            children.hide('fast');
            // 更新父节点 title 与 图标
            $(args.view.el.children).find('>span').attr('title', '展开').addClass('icon-plus').removeClass('icon-minus');
          } else { // 如果三级节点是隐藏状态
            // 显示子节点
            children.show('fast');
            // 更新父节点 title & 图标
            $(args.view.el.children).find('>span').attr('title', '折叠').addClass('icon-minus').removeClass('icon-plus');
          }
        } else { // 如果没有子节点
          // 加载子节点
          subdataid = args.model.get("id");
          subnodes = new TreeNode(subdata(subdataid));
          args.collection.add(subnodes);
          // 父节点 改为展开图标
          $(args.view.el.children).find('>span').attr('title', '折叠').addClass('icon-minus').removeClass('icon-plus');
          // 子节点 改为用户图标
          $(args.view.el.children).find('ul .icon-home').addClass('icon-user').removeClass('icon-home');
          // args.collection.add(subnodes1, subnodes2]);
        }
      };

      App.vent.on("something", dosomething);

      /*treeView.render();
      $(".tree").html(treeView.el);*/

      App.pageleft.show(treeView);
      // 加载后，所有父节点增加加号图标与title
      $('#page-left li > span').attr('title', '展开').addClass('icon-plus');
      // 第一级节点，改为减号图标
      $('#page-left li > span').first().attr('title', '折叠').addClass('icon-minus').removeClass('icon-plus');
      //App.pageleft.show(leftview);

      contentview = new ContentView();
      App.pagecontent.show(contentview);
    },

    _setCurrentApp: function(appName) {
      this.tabsview.setCurrent(appName);
    },

  };

  return AccountController;

});