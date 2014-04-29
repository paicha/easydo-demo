define([
  'underscore',
  'marionette',
  'backbone',
  'navbar/layout_view',
  'navbar/left_view',
  'navbar/right_view',
], function(_, Marionette, Backbone, LayoutView, LeftView, RightView) {

  var Controller = Marionette.Controller.extend({

    showNavbar: function(regions) {
      this.regions = regions;

      var func = _.bind(this._showNavbar, this);
      App = require('app');
      $.when(App.request("navbar:entities"))
        .then(func);
    },

    _showNavbar: function(navbarCollection) {
      var layoutview = new LayoutView();
      this.leftview = new LeftView({
        collection: navbarCollection
      });
      var rightview = new RightView();

      this.regions.show(layoutview);
      layoutview.left.show(this.leftview);
      layoutview.right.show(rightview);

      this.leftview.setCurrent(this.selected_app);
    },

    setCurrentApp: function(appName) {
      this.selected_app = appName; // 首次加载由于异步操作，导航数据还未加载渲染，临时保存appName
      if (this.leftview) {
        this.leftview.setCurrent(appName);
      }
    }

  });

  return Controller;

});