define([
  'underscore',
  'marionette',
  'backbone',
  'navbar/layout_view',
  'navbar/left_view',
  'navbar/right_view',
  'navbar/nav_collection'
], function(_, Marionette, Backbone, LayoutView, LeftView, RightView, NavCollection) {

  var Controller = Marionette.Controller.extend({

    showNavbar: function(regions) {
      this.layoutview = new LayoutView();
      this.rightview = new RightView();

      var that = this;
      this.navbardata = new NavCollection();
      this.navbardata.fetch({
        success: (function() {
          that.leftview.setCurrent(that.selected_app); // 渲染导航之后，高亮当前导航
        })
      });
      this.leftview = new LeftView({
        collection: this.navbardata
      });

      regions.show(this.layoutview);
      this.layoutview.left.show(this.leftview);
      this.layoutview.right.show(this.rightview);
    },

    setCurrentApp: function(appName) {
      this.selected_app = appName; // 首次加载由于异步操作，导航数据还未加载渲染，临时保存appName
      this.leftview.setCurrent(appName);
    }

  });

  return Controller;

});