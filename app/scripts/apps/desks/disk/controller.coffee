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
            # 显示分享遮罩弹窗
            shareView = new ShareView
            App.modal.show shareView
            
            # 初始化选择组件
            @selectView = new SelectorComponent
                inputId: "members"
                multiple: true
                selectable: ['ou', 'group', 'person']
            
            # 渲染
            @selectView.render '#disk-select-share'
            
            # 获取导航树数据
            $.when(App.request 'orgtree:entities', 'api/orgtree.json')
                .then _.bind @showTree, this

            # 监听事件
            @selectView.on 'deselect', (node) ->
                console.log "removed:" + JSON.stringify(node)
            @selectView.on 'select', (node) ->
                console.log "added:" + JSON.stringify(node)

            # 打印当前选中
            that = this
            shareView.on 'showSelected', ->
                console.log that.selectView.get_selected()

        showTree: (orgtree) ->
            # Todo 数据转换
            treedata = orgtree
            # 加载数据到导航树
            @selectView.load_tree treedata