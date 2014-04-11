define(function(require) {

  return {

    app: {
      layout: require('text!tmpl/app/applayout.html'),
      topTabs: require('text!tmpl/app/topTabs.html'),
      left: require('text!tmpl/app/left.html'),
      todo: require('text!tmpl/app/todo.html'),
    },

    file: {
      list: require('text!tmpl/file/list.html'),
      item: require('text!tmpl/file/item.html'),
      form: require('text!tmpl/file/form.html') //create and update
    },

    sales: {
      item: require('text!tmpl/sales/item.html'),
      tabs: require('text!tmpl/sales/tabs.html')
    },

    nav: {
      left: require('text!tmpl/nav/left.html'),
      right: require('text!tmpl/nav/right.html')
    }
  };

});