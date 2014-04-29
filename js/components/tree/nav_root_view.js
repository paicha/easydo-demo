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

    hiddenNodes: function(){
      $(this.el).find('li > ul').hide();
    }

  });
});