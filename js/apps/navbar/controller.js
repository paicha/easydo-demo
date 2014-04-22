define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'apps/navbar/layout_view',
  'apps/navbar/left_view',
  'apps/navbar/right_view',
  'apps/navbar/nav_collection'
], function(_, Marionette, Backbone, App, LayoutView, LeftView, RightView, NavCollection) {

  var NavbarController = Marionette.Controller.extend({

    initialize: function() {
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

      App.vent.on("app:started", this._setCurrentApp, this);
    },

    showNavbar: function() {
      App.navbar.show(this.layoutview);
      this.layoutview.left.show(this.leftview);
      this.layoutview.right.show(this.rightview);
    },

    _setCurrentApp: function(appName) {
      this.selected_app = appName; // 首次加载由于异步操作，导航数据还未加载渲染，临时保存appName
      this.leftview.setCurrent(appName);
    },

  });

  return NavbarController;

});