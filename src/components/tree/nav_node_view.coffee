define [
  'underscore'
  'marionette'
  'text!components/tree/tmpl/node.html'
], (_, Marionette, Template) ->

  Marionette.CompositeView.extend

    template: _.template(Template)

    tagName: 'ul'

    initialize: (options) ->
      @collection = @model.nodes
      @controller = options.controller

      # 保存当前加载的节点
      @controller.nodeList[@model.id] = this

      # 点击展开收缩事件
      @on 'click:toggle', @_onToggle

      # 点击复选框事件
      @on 'click:checkbox', @_clickCheckbox
      
      # 点击节点事件
      @on 'click:node', @_clickNode
      return

    _clickCheckbox: (node) ->
      nodeName = node.model.get 'nodeName'
      checked = $('#checkbox-' + node.model.get 'id').prop 'checked'
      if checked
        # 保存当前勾选节点
        @controller.checkedNode[nodeName] = node.view
      else
        # 如果没勾选，删除
        delete @controller.checkedNode[nodeName]
      return

    _clickNode: (node) ->
      # 设置高亮
      @activate()
      # 触发 controller 的 clicknode 事件
      @controller.trigger 'clicknode', node.view
      return

    # 点击展开折叠事件
    _onToggle: (node) ->
      if @isExpanded() then @collapse() else @expand()
      return

    triggers:
      'click .toggle-icon': 'click:toggle'
      'click a': 'click:node'
      'click .node-checkbox':
        event: 'click:checkbox'
        # 允许默认事件
        preventDefault: false
        stopPropagation: true

    # 加载子节点
    load_nodes: (data) ->
      @collection.add data
      if @on_loaded
        @on_loaded this
        @on_loaded = null
      return

    # 自定义序列化数据
    serializeData: ->
      # 获取初始化传递的 checkable 设置
      checkable = @model.get 'checkable'
      # 优先使用数据中的 checkable
      checkable = @controller.checkable  if typeof checkable is 'undefined'

      id: @model.get 'id'
      icon: @model.get 'icon'
      nodeName: @model.get 'nodeName'
      is_folder: @model.get 'is_folder'
      
      checkable: checkable

    # 传递 controller 到子节点 View
    itemViewOptions: ->
      controller: @controller
    
    # 渲染节点
    appendHtml: (collectionView, itemView) ->
      collectionView.$('li:first').append itemView.el
      return

    # 判断是否展开
    isExpanded: ->
      $(@el).find('span').first().attr('class').indexOf('plus') <= -1
    
    # 展开操作
    expand: (on_expanded) ->
      unless @collection.length
        @on_loaded = on_expanded
        # 如果 collection 为空、设置了动态加载，而且是目录类型，触发加载节点事件
        if not @controller.is_static and @model.get 'is_folder'
          @controller.trigger 'load', this, @model
        else on_expanded this  if on_expanded
      else on_expanded this  if on_expanded
      
      # dom 操作
      $(@el).find('span').first().addClass('icon-minus').removeClass 'icon-plus'
      $(@el).children().children().filter('ul').show 'fast'
      return
    
    # 折叠操作
    collapse: ->
      $(@el).find('span').first().addClass('icon-plus').removeClass 'icon-minus'
      $(@el).children().children().filter('ul').hide 'fast'
      return

    # 设置高亮
    activate: ->
      # 上一次的记录的 active
      lastActive = @controller.currentNode
      lastActive = lastActive.model.get 'id'  if lastActive
      # 当前的 active
      currentActive = @model.get 'id'
      if lastActive is currentActive
        return
      else
        # 取消上次保存的高亮class
        $('.navtree .node-a-' + lastActive).find('div').removeClass 'node-active'
        # 当前高亮
        $(@el).find('.node').first().addClass 'node-active'
        # 保存当前激活节点
        @controller.currentNode = this
      return

