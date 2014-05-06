define([
  'underscore',
  'marionette',
  'text!components/tree/tmpl/node.html'
], function(_, Marionette, Template) {

  return Marionette.CompositeView.extend({

    template: _.template(Template),

    tagName: "ul",

    initialize: function(options) {
      this.collection = this.model.nodes;
      this.controller = options.controller;
      // 保存当前加载的节点
      this.controller.nodeList[this.model.id] = this;

      // 点击展开收缩事件
      this.on('click:toggle', this._onToggle);
      // 点击复选框事件
      this.on('click:checkbox', this._clickCheckbox);
      // 点击节点事件
      this.on('click:node', this._clickNode);
    },

    _clickCheckbox: function(node) {
      var nodeName = node.model.get('nodeName');
      var checked = $('#checkbox-' + node.model.get('id')).prop('checked');
      if (checked) {
        // 保存当前勾选节点
        this.controller.checkedNode[nodeName] = node.view;
      } else {
        // 如果没勾选，删除
        delete this.controller.checkedNode[nodeName];
      }
    },

    _clickNode: function(node) {
      // 设置高亮
      this.activate();
      // 触发 controller 的 clicknode 事件
      this.controller.trigger('clicknode', node.view);
    },


    _onToggle: function(node) {
      // 点击展开折叠事件
      if (this.isExpanded()) {
        this.collapse();
      } else {
        this.expand();
      }
    },

    triggers: {
      'click .toggle-icon': 'click:toggle',
      'click a': "click:node",
      'click .node-checkbox': {
        event: "click:checkbox",
        // 允许默认事件
        preventDefault: false,
        stopPropagation: true
      }
    },

    // 加载子节点
    load_nodes: function(data) {
      this.collection.add(data);
      if (this.on_loaded) {
        this.on_loaded(this);
        this.on_loaded = null;
      }
    },

    // 自定义序列化数据
    serializeData: function() {
      var checkable = this.model.get("checkable");
      // 优先使用数据中的 checkable
      if (typeof checkable === "undefined") checkable = this.controller.checkable;

      return {
        "id": this.model.get("id"),
        "icon": this.model.get("icon"),
        "nodeName": this.model.get("nodeName"),
        "is_folder": this.model.get("is_folder"),
        // 使用初始化传递的 checkable 设置
        "checkable": checkable
      };
    },

    // 传递 controller 到子节点 View
    itemViewOptions: function() {
      return {
        controller: this.controller
      };
    },

    // 渲染节点
    appendHtml: function(collectionView, itemView) {
      collectionView.$("li:first").append(itemView.el);
    },

    // 判断是否展开
    isExpanded: function() {
      return $(this.el).find('span').first().attr('class').indexOf("plus") <= -1;
    },

    // 展开操作
    expand: function(on_expanded) {
      if (!this.collection.length) {
        this.on_loaded = on_expanded;
        // 如果 collection 为空、设置了动态加载，而且是目录类型，触发加载节点事件
        if (!this.controller.is_static && this.model.get('is_folder')) {
          this.controller.trigger('load', this, this.model);
        } else if (on_expanded) {
          on_expanded(this);
        }
      } else if (on_expanded) {
        on_expanded(this);
      }

      // dom 操作
      $(this.el).find('span').first().addClass('icon-minus').removeClass('icon-plus');
      $(this.el).children().children().filter('ul').show('fast');
    },

    // 折叠操作
    collapse: function() {
      $(this.el).find('span').first().addClass('icon-plus').removeClass('icon-minus');
      $(this.el).children().children().filter('ul').hide('fast');
    },

    // 设置高亮
    activate: function() {
      // 上一次的记录的 active
      var lastActive = this.controller.currentNode;
      if (lastActive) lastActive = lastActive.model.get('id');
      // 当前的 active
      var currentActive = this.model.get('id');
      if (lastActive === currentActive) {
        return;
      } else {
        // 取消上次保存的高亮class
        $(".navtree .node-a-" + lastActive).find('div').removeClass('node-active');
        // 当前高亮
        $(this.el).find('.node').first().addClass('node-active');
        // 保存当前激活节点
        this.controller.currentNode = this;
      }
    }
  });

});