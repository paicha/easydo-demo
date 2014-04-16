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
        nodeName: "测试站点",
        nodes: [
        {
          nodeName: "财务总监",
          nodes: []
        }
        ]
      }];


      this.tree = new TreeNodeCollection(treeData);
      var treeView = new NavRootView({
        collection: this.tree
      });

      subdata = {
        nodeName: "财务部",
        nodes: [{
          nodeName: "财务总监",
          nodes: []
        }, {
          nodeName: "会计/出纳",
          nodes: []
        }, {
          nodeName: "财务助理",
          nodes: []
        }]
      };

      var dosomething = function(args) {
        subnodes1 = new TreeNode(subdata);
        subnodes2 = new TreeNode(subdata);
        args.collection.add([subnodes1, subnodes2]);
      };
      App.vent.on("something", dosomething);

      /*treeView.render();
      $(".tree").html(treeView.el);*/

      App.pageleft.show(treeView);

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