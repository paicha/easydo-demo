define([
  'underscore',
  'marionette',
  'templates',
  'views/AppLayoutView',
  'views/desk/DesksTabsView',
  'views/desk/DesksLeftView',
  'views/desk/DesksContentView',
  'models/FileModel',
  'collections/FileCollection',
  'vent',
],

function (_, Marionette, templates, AppLayoutView, DesksTabsView, DesksLeftView, DesksContentView, FileModel, FileCollection, vent) {

  var FileController = {

    DesksPage: function () {

    
      var desksTabsView  = new DesksTabsView({
        
      });

      var desksleftView  = new DesksLeftView({
        
      });
      /*desksNavView.on('file:create',          this.createFile, this);
      desksNavView.on('file:createFolder',    this.createFolder, this);
      desksNavView.on('itemview:file:delete', this.deleteFile, this);*/

      this.layout  = new AppLayoutView({
      });

      vent.trigger('app:show', this.layout);
      ActiveMainNav();
      this.layout.topTabs.show(desksTabsView);
      this.layout.left.show(desksleftView);

    },

    DesksTodo: function () {

    
      var desksTabsView  = new DesksTabsView({
        
      });

      var desksleftView  = new DesksLeftView({
        
      });

      var desksContentView  = new DesksContentView({
        
      });
      /*desksNavView.on('file:create',          this.createFile, this);
      desksNavView.on('file:createFolder',    this.createFolder, this);
      desksNavView.on('itemview:file:delete', this.deleteFile, this);*/

      this.layout  = new AppLayoutView({
      });

      vent.trigger('app:show', this.layout);
      this.layout.topTabs.show(desksTabsView);
      this.layout.left.show(desksleftView);
      ActiveLeftNav();
      this.layout.content.show(desksContentView);

    },
  };

  return FileController;

});