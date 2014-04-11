define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'apps/desks/disk/contentlistview',
  'apps/desks/disk/rightview',
  'apps/desks/disk/filemodel',
  'apps/desks/disk/uploadview',
  'apps/desks/disk/filecollection',
  'apps/desks/todo/contentview'
],

function(_, Marionette, Backbone, App, ContentListView, RightView, FileModel, UploadView, FileCollection, todoContentView) {

  var DesksController = {

    ShowDesks: function(){

    },

    DiskApp: function() {

      $('.nav-pills a[href="#desks-disk"]').tab('show');

      if (! this.files) {
        this.files = new FileCollection();

        this.files.fetch({reset: true});
      }

      var contentlistview = new ContentListView({
        collection: this.files
      });
      App.pagecontent.show(contentlistview);

      var rightview = new RightView();
      App.pageright.show(rightview);

      rightview.on('file:upload', this.uploadFile, this);
      rightview.on('file:createFolder', this.createFolder, this);
    },

    TodoApp: function() {
      $('.nav-pills a[href="#desks-todo"]').tab('show');
      App.pageright.reset();
      var todocontentview = new todoContentView({
      });
      App.pagecontent.show(todocontentview);
    },

    uploadFile: function(args) {

      var fileModel = new FileModel({}, {
        collection: this.files
      });

      var uploadview = new UploadView({
        model: fileModel,
        action: 'create'
      });

      uploadview.on('file:save', this.saveFile, this);
      App.modal.show(uploadview);
    },

    createFolder: function(args) {

      var fileModel = new FileModel({}, {
        collection: this.files
      });

      var uploadview = new UploadView({
        model: fileModel,
        action: 'create'
      });

      uploadview.on('file:save', this.saveFile, this);
      App.modal.show(uploadview);
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
          App.modal.hideModal();
        },
        error: function(model, xhr, options) {
          console.log('User save server ERROR');
        }
      });
      
    }
  };

  return DesksController;

});