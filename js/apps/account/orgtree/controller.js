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
      var leftView = new LeftView();
      App.pageleft.show(leftView);

      var func = _.bind(this.showTree, this);
      $.when(App.request("orgtree:entities", "/orgtree.json"))
        .then(func);
    },

    showTree: function(orgtree) {
      treedata = orgtree;
      var treeView = new TreeComponent({
        checkable: false,
      });
      treeView.load_nodes(treedata);
      treeView.render("#orgtree");

      treeView.on("load", function(that) {
        that.load_nodes([{
          "nodeName": "总裁",
          "nodeId": "7",
          "icon": "icon-home",
          "nodes": []
        }, {
          "nodeName": "副总裁",
          "nodeId": "8",
          "icon": "icon-home",
          "nodes": []
        }, {
          "nodeName": "总经理",
          "nodeId": "9",
          "icon": "icon-home",
          "nodes": []
        }]);
      });
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