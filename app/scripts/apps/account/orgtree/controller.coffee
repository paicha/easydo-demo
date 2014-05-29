define [
    'underscore'
    'marionette'
    'backbone'
    'app'
    'treeview'
    'apps/account/orgtree/left_view'
    'apps/account/orgtree/node_content_view'
    'apps/account/orgtree/root_content_view'
], (_, Marionette, Backbone, App, TreeComponent, LeftView, NodeContentView, RootContentView) ->

    Controller =

        orgTreeApp: ->
            #TreeComponent = require(['TreeView'])
            # 渲染左侧栏内容
            leftView = new LeftView()
            App.pageleft.show leftView

            # 初始化导航树组件
            @treeView = new TreeComponent
                checkable: true # 显示复选框
                is_static: false # 是否静态

            # 渲染到左侧栏特定 DOM 区域
            @treeView.render '#orgtree'
            
            # 监听加载节点事件
            @treeView.on 'load', @loadNodes
            
            # 加载一级导航树
            $.when(App.request 'orgtree:entities')
                .then _.bind @showTree, this
            
            # ====== Test Begin ======
            that = this
            # 监听点击节点事件
            @treeView.on 'clicknode', (nodeView) ->
                App.router.navigate "account-orgtree-#{nodeView.model.get('id')}", trigger: true
            
            # 打印勾选节点
            leftView.on 'showCheckedList', ->
                console.log that.treeView.get_checked()
            
            # 根据nodeid打印节点
            leftView.on 'getNode', ->
                nodeId = prompt '输入nodeId'
                nodeView = that.treeView.get_node nodeId
                console.log nodeView
                nodeView.activate()

            # 根据nodeid展开导航树
            leftView.on 'expandNode', ->
                that.treeView.get_node_by_path [0, 1, 11], (node) ->
                    node.activate()
            # ====== Test End ====== 

        showTree: (orgtree) ->
            # Todo 数据转换
            treedata = orgtree
            # 加载数据到导航树
            @treeView.load_nodes treedata

        loadNodes: (nodeView, nodeModel) ->
            load = (data) ->
                # Todo 数据转换
                nodeDate = data
                # 加载数据到导航树
                nodeView.load_nodes data
            
            # 根据当前节点请求相应的URL
            $.when(App.request 'orgtree:entities', nodeModel.get('id'))
                .then load

        treeNode: (id) ->
            contentview = new NodeContentView()
            App.pagecontent.show contentview
            @treeView.get_node_by_path [0, id], (node) ->
                node.activate()

        treeRoot: ->
            contentview = new RootContentView()
            App.pagecontent.show contentview