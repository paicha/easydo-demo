define [
    'treeview'
], (TreeComponent) ->

    Backbone.View.extend

        initialize: ->
            # 导航树
            @treeView = new TreeComponent
                checkable: false # 显示复选框
                is_static: false # 是否静态

            # 点击节点触发 slesct2 更新选项
            that = this
            @treeView.on 'clicknode', (nodeView) =>
                that.nodeId = nodeView.model.get "id"
                $('[id^="s2id_autogen"]').val('').trigger('input')

            # 储存当前已选信息
            @selected = []

        render: (inputId, multiple, selectData, treeDate) ->
            that = this
            # select2 初始化
            $("#{inputId}").select2
                formatNoMatches: "未找到相关结果"
                placeholder: "点击这里"
                allowClear: true
                closeOnSelect: false
                # 用户设置多选
                multiple: multiple
                query: (query) ->
                    data = selectData(query, that.nodeId)
                    query.callback data
                    that.nodeId = null

            # 假如是单选模式，出现第二层的搜索框，修复高度
            if $('#s2id_autogen1_search').length
                $('.select2-drop').addClass('fix-select2-drop-height')

            # 下标
            $('.select2-choices').append('<span class="fa fa-angle-down fa-lg"></span>')

            # 选择框打开时
            $("#{inputId}").on "select2-open", ->
                if not $('.navtree').length
                    # 将导航树放在正确的位置
                    $('.select2-results').before(that.treeView.treeView.el)
                    # 加载导航树数据
                    that.treeView.load_nodes treeDate
                    # 展开并激活节点
                    that.treeView.get_node_by_path [0], (node) ->
                        node.activate()
                # 变换图标
                $('.select2-choices>span').removeClass('fa-angle-down').addClass('fa-angle-up')

            # 选择框关闭时
            $("#{inputId}").on "select2-close", ->
                $('.select2-choices>span').removeClass('fa-angle-up').addClass('fa-angle-down')

            # 选择变化事件
            $("#{inputId}").on "change", (e) =>
                # 触发 选择/取消选择 事件
                if typeof e.added is "undefined"
                    @trigger 'deselect', e.removed
                else
                    @trigger 'select', e.added
                # 存储当前已选
                @selected = e.val