define([
  'backbone',
  'marionette',
  'components/navbar/layout_view',
  'components/navbar/left_view',
  'components/navbar/right_view',
  'components/navbar/nav_collection'
], function(Backbone, Marionette, LayoutView, LeftView, RightView, NavCollection) {

  var App = new Marionette.Application();

  var ModalRegion = Marionette.Region.extend({
    el: "#modal",

    onShow: function(view) {
      view.on("close", this.hideModal, this);
      this.$el.modal('show');
    },

    hideModal: function() {
      this.$el.modal('hide');
    }
  });

  App.addRegions({
    navbar: "#navbar",
    pagetabs: "#page-tabs",
    pageleft: "#page-left",
    pagecontent: "#page-content",
    pageright: "#page-right",
    modal: ModalRegion
  });

  App.addInitializer(function() {
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
    App.navbar.show(this.layoutview);
    this.layoutview.left.show(this.leftview);
    this.layoutview.right.show(this.rightview);

    App.vent.on("app:started", this.setCurrentApp, this);
  });

  App.on("initialize:after", function() {
    if (Backbone.history) {
      Backbone.history.start();
    }
  });

  App.setCurrentApp = function(appName) {
    this.selected_app = appName; // 首次加载由于异步操作，导航数据还未加载渲染，临时保存appName
    this.leftview.setCurrent(appName);
  };

  App.startSubApp = function(appName, args) {
    var currentApp = App.module(appName);
    if (App.currentApp === currentApp) {
      return;
    }

    if (App.currentApp) {
      App.currentApp.stop();
    }

    App.currentApp = currentApp;
    currentApp.start(args);
    App.vent.trigger("app:started", appName);
  };

  return App;
});