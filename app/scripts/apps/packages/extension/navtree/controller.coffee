define [
    'underscore'
    'marionette'
    'app'
    'treeview'
    'apps/packages/extension/navtree/left_view'
], (_, Marionette, App, TreeComponent, LeftView) ->

    Controller = Marionette.Controller.extend
        show: ->
            @leftView = new LeftView()
            App.pageleft.show @leftView

            # 初始化导航树组件
            @treeView = new TreeComponent
                checkable: false # 显示复选框
                is_static: true # 是否静态

            # 渲染到左侧栏特定 DOM 区域
            @treeView.render '#packages-orgtree'
            
            # 监听加载节点事件
            @treeView.on 'load', @loadNodes

            # 加载一级导航树
            $.when(App.request 'packages:entities')
                .then _.bind @_showTree, this

            # 点击节点事件
            @treeView.on 'clicknode', (nodeView) =>
                id = nodeView.model.get 'id'
                nodeName = nodeView.model.get 'nodeName'
                is_folder = nodeView.model.get 'is_folder'
                # 展开节点
                @treeView.get_node_by_path [id], (node) ->
                    node.activate()

                 # 根据节点名称，导航到相应的栏目
                if is_folder
                    switch nodeName
                        when '概览' then column = '-detail'
                        when '表单' then column = '-forms'
                        when '代码' then column = '-code'
                        when '流程' then column = '-flowchart'
                        when '应用设置' then column = '-setting'
                        else column = nodeName
                    fileName = ''
                else
                    # 保存第三个节点id
                    @node3 = nodeView.model.id
                    # 非目录，将id输出到url
                    column = ''
                    fileName = "-#{id}"

                App.router.navigate "packages-#{@extensionName}#{column}#{fileName}", trigger: true

        _showTree: (orgtree) ->
            # Todo 数据转换
            treedata = orgtree
            # 加载数据到导航树
            @treeView.load_nodes treedata
            # 保存当前软件包名称
            @extensionName = treedata[0].id
            # 根据nodeId展开节点
            @treeView.get_node_by_path [@extensionName], (node) ->
                node.activate()

            # 设置当前高亮节点
            @leftView.setCurrent @extensionName, @selected_node, @treeView

        setCurrentNode: (appName) ->
            # 首次加载由于异步操作，数据还未加载渲染，临时保存nodename
            @selected_node = appName
            # 如果已经加载了设置高亮
            if @extensionName then @leftView.setCurrent @extensionName, appName, @treeView