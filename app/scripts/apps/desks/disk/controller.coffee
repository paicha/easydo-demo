define [
    'underscore'
    'marionette'
    'backbone'
    'app'
    'apps/desks/disk/content_list_view'
    'apps/desks/disk/right_view'
    'apps/desks/disk/file_model'
    'apps/desks/disk/upload_view'
    'apps/desks/disk/file_collection'
    'apps/desks/disk/share_view'
    'components/member_selector/scripts/controller'
], (_, Marionette, Backbone, App, ContentListView, RightView, FileModel, UploadView, FileCollection, ShareView, SelectorComponent) ->

    DiskController =

        DiskApp: ->
            unless @files
                @files = new FileCollection()
                @files.fetch reset: true

            contentlistview = new ContentListView collection: @files
            App.pagecontent.show contentlistview
            rightview = new RightView()
            App.pageright.show rightview
            rightview.on 'file:upload', @uploadFile, this
            rightview.on 'file:createFolder', @createFolder, this
            contentlistview.on 'file:share', @shareFile, this

        uploadFile: (args) ->
            fileModel = new FileModel {},
                collection: @files
            uploadview = new UploadView
                model: fileModel
                action: 'create'

            uploadview.on 'file:save', @saveFile, this
            App.modal.show uploadview

        createFolder: (args) ->
            fileModel = new FileModel {},
                collection: @files
            uploadview = new UploadView
                model: fileModel
                action: 'create'

            uploadview.on 'file:save', @saveFile, this
            App.modal.show uploadview

        saveFile: (args) ->
            self = this
            view = args.view
            model = args.model
            title = view.$('input#title').val()
            admin = view.$('input#admin').val()
            tag = view.$('input#tag').val()
            size = view.$('input#size').val()
            update = view.$('input#update').val()
            model.save
                title: title
                admin: admin
                tag: tag
                size: size
                update: update
            ,
                success: (model, response, options) ->
                    self.files.add model
                    App.modal.hideModal()

                error: (model, xhr, options) ->
                    console.log 'User save server ERROR'

        shareFile: (args) ->
            shareview = new ShareView
            App.modal.show shareview

            selectView = new SelectorComponent
            selectView.render '#disk-select-share'