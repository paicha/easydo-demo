define [
    'jquery'
    'underscore'
    'marionette'
    'backbone'
    'app'
    'components/member_selector/scripts/view'
    'select2'
], ($, _, Marionette, Backbone, App, MemberSelectorView, Select2) ->

    Controller = Marionette.Controller.extend
        initialize: (options) ->
            # 组件设置：元素ID、是否多选、可选类型
            @inputId = options.inputId
            @multiple = options.multiple
            @selectable = options.selectable

            # 选择框
            @memberSelectorView = new MemberSelectorView
            # 动态加载导航树节点
            @memberSelectorView.treeView.on 'load', (nodeView, nodeModel) ->
                load = (data) ->
                    # Todo 数据转换
                    nodeData = data
                    # 加载数据到导航树
                    nodeView.load_nodes nodeData
                # 根据当前节点请求相应的Url
                $.when(App.request 'orgtree:entities', nodeModel.get('id'))
                    .then load

            # 获取导航树数据
            $.when(App.request 'orgtree:entities')
                .then _.bind @_render, this

            @memberSelectorView.on 'deselect', (node) =>
                @trigger 'deselect', node
            @memberSelectorView.on 'select', (node) =>
                @trigger 'select', node

            # 默认选项、搜索结果、点击节点结果
            @selectData = (query, nodeId) ->
                if nodeId
                    selectData =
                        results:[
                                  {
                                    text: "部门"
                                    children: [
                                      {
                                        id: nodeId
                                        text: "nodeId:" + nodeId
                                      }
                                    ]
                                  }
                                ]
                    
                else if query.term is ""
                    selectData =
                        results:[
                            {
                              text: "部门"
                              children: [
                                {
                                  id: "CA"
                                  text: "部门1"
                                }
                                {
                                  id: "AZ"
                                  text: "部门2"
                                }
                              ]
                            }
                            {
                              text: "组"
                              children: [
                                id: "FL"
                                text: "组1"
                              ]
                            }
                            {
                              text: "人员"
                              children: [
                                {
                                  id: "FLs"
                                  text: "小明"
                                }
                                {
                                  id: "FLss"
                                  text: "小明2"
                                }
                                {
                                  id: "FLs22s"
                                  text: "小明3"
                                }
                              ]
                            }
                        ]
                else
                    data = results: []
                    i = 1
                    while i < 5
                      s = ""
                      j = 0
                      while j < i
                        s = s + query.term
                        j++
                      data.results.push
                        id: query.term + i
                        text: s

                      i++

                    return data

        _render: (orgtree) ->
            # Todo 数据转换
            @treeDate = orgtree
            # 渲染选择框
            @memberSelectorView.render(@inputId, @multiple, @selectData, @treeDate)

        destroy: ->
            $("#{@inputId}").select2 'destroy'

        # 获取当前已选项
        get_selected: ->
            @memberSelectorView.selected