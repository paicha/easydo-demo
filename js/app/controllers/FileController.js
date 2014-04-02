define([
  'underscore',
  'marionette',
  'templates',
  'views/AppLayoutView',
  'views/file/FileListView',
  'views/file/FileView',
  'views/desk/DesksTabsView',
  'views/desk/DesksLeftView',
  'models/FileModel',
  'collections/FileCollection',
  'vent',
],

function (_, Marionette, templates, AppLayoutView, FileListView, FileView, DesksTabsView, DesksLeftView, FileModel, FileCollection, vent) {

  var FileController = {

    Filelist: function () {

      if (! this.files) {
        this.files = new FileCollection();

        this.files.fetch({reset: true});
      }
    
      var fileListView  = new FileListView({
        collection: this.files
      });

      var desksTabsView  = new DesksTabsView({
        
      });

      var desksleftView  = new DesksLeftView({
        
      });
      
      fileListView.on('file:create',          this.createFile, this);
      fileListView.on('file:createFolder',    this.createFolder, this);
      fileListView.on('itemview:file:delete', this.deleteFile, this);

      this.layout  = new AppLayoutView({
      });

      vent.trigger('app:show', this.layout);
      this.layout.topTabs.show(desksTabsView);
      this.layout.left.show(desksleftView);
      ActiveLeftNav();
      this.layout.content.show(fileListView);


    },

    beforeRender: function (itemView) {
      alert(itemView);
    },

    deleteFile: function (itemView) {
      // TODO FIXME: remove window.confirm implement a better one
      var confirm = window.confirm("Are you sure?");

      if (confirm) {
        itemView.model.destroy();
      }
    },

    createFile: function (args) {

      var fileModel = new FileModel({}, {
        collection: this.files
      });
      
      var fileView  = new FileView({
        model: fileModel,
        action: 'create'
      });

      fileView.on('file:save', this.saveFile, this);
      vent.trigger('modal:show', fileView);
    },

    createFolder: function (args) {

      var folderModel = new FileModel({}, {
        collection: this.files
      });
      
      var fileView  = new FileView({
        model: folderModel,
        action: 'create'
      });

      fileView.on('file:save', this.saveFile, this);
      vent.trigger('modal:show', fileView);
    },

    saveFile: function (args) {
      var self   = this;
      var view   = args.view;
      var model  = args.model;
      var title  = view.$('input#title').val();
      var admin = view.$('input#admin').val();
      var tag = view.$('input#tag').val();
      var size  = view.$('input#size').val();
      var update = view.$('input#update').val();

      model.save({
        title : title,
        admin : admin,
        tag   : tag,
        size  : size,
        update: update
      }, {
        success: function(model, response, options) {
          self.files.add(model);
          vent.trigger('modal:close');
        },
        error: function(model, xhr, options) {
          console.log('User save server ERROR');
        }
      });
      
    }

  };

  return FileController;

});