define([
  'underscore',
  'marionette',
  'components/tree/nav_node_view'
], function(_, Marionette, NavNodeView) {

  return Marionette.CollectionView.extend({
    initialize: function(options) {
      this.controller = options.controller;
    },

    className: "navtree",

    itemView: NavNodeView,

    itemViewOptions: function() {
      return {
        controller: this.controller
      };
    },

    collapse: function() {
      $(this.el).find('li > ul').hide();
    },

    loadCss: function(url) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = url;
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  });
});