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

      // 点击展开折叠事件
      this.on('click:toggle', function(node) {
        if (this.isExpanded()) {
          this.collapse();
        } else {
          // 如果 collection 为空
          if (!this.collection.length) this.controller.trigger('load', node.view, node.model);
          this.expand();
        }
      });

      // 点击复选框事件
      this.on('click:checkbox', function(node) {
        var nodeName = node.model.get('nodeName');
        var checked = $('#checkbox-' + node.model.get('id')).prop('checked');
        if (checked) {
          // 保存当前勾选节点
          this.controller.checkedNode[nodeName] = node.view;
        } else {
          // 如果没勾选，删除
          delete this.controller.checkedNode[nodeName];
        }
      });

      // 点击节点事件
      this.on('click:node', function(node) {
        // 设置高亮
        this.setActive(node.view);
        // 触发 controller 的 clicknode 事件
        this.controller.trigger('clicknode', node.view);
      });
    },

    triggers: {
      'click .toggle-icon': 'click:toggle',
      'click a': {
        event: "click:node",
        // 取消禁止默认事件
        preventDefault: false,
        // 停止事件冒泡到 DOM 树上
        stopPropagation: true
      },
      'click .node-checkbox': {
        event: "click:checkbox",
        preventDefault: false,
        stopPropagation: true
      }
    },

    // 加载子节点
    load_nodes: function(data) {
      this.collection.add(data);
    },

    // 自定义序列化数据
    serializeData: function() {
      return {
        "id": this.model.get("id"),
        "icon": this.model.get("icon"),
        "nodeName": this.model.get("nodeName"),
        // 使用初始化传递的 checkable 设置
        "checkable": this.controller.options.checkable
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
      if ($(this.el).find('span').first().attr('class').indexOf("plus") > -1) {
        return false;
      } else {
        return true;
      }
    },

    // 展开操作
    expand: function() {
      $(this.el).find('span').first().addClass('icon-minus').removeClass('icon-plus');
      $(this.el).children().children().filter('ul').show('fast');
    },

    // 折叠操作
    collapse: function() {
      $(this.el).find('span').first().addClass('icon-plus').removeClass('icon-minus');
      $(this.el).children().children().filter('ul').hide('fast');
    },

    // 设置高亮
    setActive: function(nodeView) {
      // 上一次的记录的 active
      var lastActive = this.controller.currentNode;
      if (lastActive) lastActive = lastActive.model.get('id');
      // 当前的 active
      var currentActive = nodeView.model.get('id');
      if (lastActive === currentActive) {
        return;
      } else {
        // 取消上次保存的高亮class
        $(".navtree li>a[href*=" + lastActive + "]").find('div').removeClass('node-active');
        // 当前高亮
        $(nodeView.el).find('.node').first().addClass('node-active');
        // 保存当前激活节点
        this.controller.currentNode = nodeView;
      }
    }
  });

});