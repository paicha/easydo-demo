define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'apps/navbar/layoutview',
  'apps/navbar/leftview',
  'apps/navbar/rightview',
  'apps/navbar/collection'
], function(_, Marionette, Backbone, App, LayoutView, LeftView, RightView, Collection) {

  var NavbarController = Marionette.Controller.extend({

    selected_app: '',
    navbardata: new Collection(),
    layoutview: new LayoutView(),
    rightview: new RightView(),
    leftview: new LeftView({
    }),

    initialize: function() {
      App.vent.on("app:started", this._setCurrentApp, this);
      var that = this;
      this.navbardata.fetch({
        success: (function() {
          that.leftview.setCurrent(that.selected_app);
        })
      });
    },

    onClose: function() {
      App.vent.off("app:started", this._setCurrentApp, this);
    },

    showNavbar: function() {
      App.navbar.show(this.layoutview);
      this.layoutview.left.show(this.leftview);
      this.layoutview.right.show(this.rightview);
    },

    _setCurrentApp: function(appName) {
      this.selected_app = appName; // 第一次可能导航数据还未加载，临时保存下
      this.leftview.setCurrent(appName);
    },


  });

  return NavbarController;

});