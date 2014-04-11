define([
    'underscore',
    'marionette',
    'templates',
    'views/desk/DesksContentView',
    'models/FileModel',
    'collections/FileCollection',
    'views/page/Pageleftview',
    'views/page/PageTabsView',
    'vent',
  ],

  function(_, Marionette, templates, DesksContentView, FileModel, FileCollection, Pageleftview, PageTabsView, vent) {

    var FileController = {

      disk: function() {

        diskContentView = new DesksContentView({});
        pageleftview = new Pageleftview({});
        pagetabsview = new PageTabsView({});

        vent.trigger('app:show', diskContentView);
        vent.trigger('pageleft:show', pageleftview);
        vent.trigger('pagetabs:show', pagetabsview);

        diskContentView.on('file:create', this.createFile, this);
        diskContentView.on('file:createFolder', this.createFolder, this);
        diskContentView.on('itemview:file:delete', this.deleteFile, this);
      },
    };

  return FileController;

});