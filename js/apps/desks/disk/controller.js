define([
  'underscore',
  'marionette',
  'backbone',
  'app',
  'apps/desks/disk/content_list_view',
  'apps/desks/disk/right_view',
  'apps/desks/disk/file_model',
  'apps/desks/disk/upload_view',
  'apps/desks/disk/file_collection',
], function(_, Marionette, Backbone, App, ContentListView, RightView, FileModel, UploadView, FileCollection) {

  var DiskController = {

    DiskApp: function() {

      if (!this.files) {
        this.files = new FileCollection();
        this.files.fetch({
          reset: true
        });
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

    saveFile: function(args) {
      var self = this;
      var view = args.view;
      var model = args.model;
      var title = view.$('input#title').val();
      var admin = view.$('input#admin').val();
      var tag = view.$('input#tag').val();
      var size = view.$('input#size').val();
      var update = view.$('input#update').val();

      model.save({
        title: title,
        admin: admin,
        tag: tag,
        size: size,
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

  return DiskController;

});