define([
    'underscore',
    'marionette',
    'templates',
    'views/Sales/SalesContentView',
    'views/Sales/PageTabsView',
    'vent'
  ],

  function(_, Marionette, templates, SalesContentView, PageTabsView, vent) {

    var SalesController = {

      SalesPage: function() {

        salesContentView = new SalesContentView({});

        pagetabsview = new PageTabsView({});

        vent.trigger('app:show', salesContentView);
        vent.trigger('pagetabs:show', pagetabsview);
        vent.trigger('pageleft:reset');
      },

    };

    return SalesController;

  });