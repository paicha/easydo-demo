define([
  'underscore',
  'backbone',
  'text!apps/navbar/tmpl/left.html',
  'text!apps/navbar/tmpl/item.html',
  'apps/navbar/collection'
], function(_, Backbone, LeftTemplate, ItemTemplate, Collection) {

  return Backbone.View.extend({

    left_template: _.template(LeftTemplate),
    item_template: _.template(ItemTemplate),

    render: function() {
      var that = this;
      var navbardata = new Collection();
      navbardata.fetch({
        success: function(navbardata) {
          navbardata = eval(JSON.stringify(navbardata));

          var addon_nav = "";
          var addon_class = "hidden";
          // 生成主导航
          var main_nav = that.item_template({navbardata: navbardata.slice(0, 3)}); // 前三个导航

          // 如果导航数据大于3个，生成下拉导航，并且取消隐藏class
          if (navbardata.length > 3) {
            addon_nav = that.item_template({navbardata: navbardata.slice(3, navbardata.length)}); // 第三个以后的导航
            addon_class = "";
          }

          // 插入模板变量，渲染导航
          that.$el.html(that.left_template({
            main_nav: main_nav,
            addon_nav: addon_nav,
            addon_class: addon_class
          }));

          return this;
        }
      });
    },

    setCurrent: function(appName) {
      $('#' + appName).tab('show');
    }

  });

});