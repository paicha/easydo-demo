define([
    'marionette',
    'views/nav/NavLeftView',
    'views/nav/NavRightView'
  ],

  function(Marionette, NavLeftView, NavRightView) {

    var app = new Marionette.Application();

    // application configuration
    app.config = {
      // you can provide an absolute URL like http://api.yourserver.com/v1
      apiUrl: 'api'
    };

    //custom region that shows a view in bootstrap modal
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

    // main regions, check index.html 
    app.addRegions({
      navleft:     "#nav-left",
      navright:    "#nav-right",
      pagetabs:    "#page-tabs",
      pageleft:    "#page-left",
      pagecontent: "#page-content",
      pageright:   "#page-right",
      modal:        ModalRegion
    });

    // app events
    app.on("initialize:after", function() {
      Backbone.history.start();
    });
    app.vent.on('app:show', function(appView) {
      app.pagecontent.show(appView);
    });
    app.vent.on('modal:show', function(view) {
      app.modal.show(view);
    });
    app.vent.on('modal:close', function() {
      app.modal.hideModal();
    });
    app.vent.on('pageleft:show', function(appView) {
      app.pageleft.show(appView);
    });
    app.vent.on('pageleft:reset', function() {
      app.pageleft.reset();
    });
    app.vent.on('pagetabs:show', function(appView) {
      app.pagetabs.show(appView);
    });
    app.vent.on('pagetabs:reset', function() {
      app.pagetabs.reset();
    });


    app.addInitializer(function(options) {

      var navLeftView = new NavLeftView({
        /*model: options.someModel*/
      });
      var navRightView = new NavRightView({
      });

      app.navleft.show(navLeftView);
      app.navright.show(navRightView);

      // init ALL app routers
      _(options.routers).each(function(router) {
        new router();
      });

    });

    return app;

  });