define([
  'underscore',
  'marionette',
  'app'
], function(_, Marionette, App) {

  return Marionette.CompositeView.extend({

    template: _.template('<li><span class="toggle-icon icon-plus"></span><a href="#account-orgtree-{{ nodeId }}"><span class="{{ icon }}"></span>{{ nodeName }}</a></li>'),

    tagName: "ul",

    initialize: function(options) {

      this.collection = this.model.nodes;
      this.controller = options.controller;
      this.on('click:toggle', function(node) {
        if (this.isExpanded()) {
          this.collapse();
        } else {
          if (!this.collection.length) {
            this.controller.trigger('load', this);
          }
          this.expand();
        }
      });
    },

    triggers: {
      'click .toggle-icon': 'click:toggle',
    },

    itemViewOptions: function() {
      return {
        controller: this.controller
      };
    },

    appendHtml: function(collectionView, itemView) {
      collectionView.$("li:first").append(itemView.el);
    },

    isExpanded: function() {
      if ($(this.el).find('span').first().attr('class').indexOf("plus") > -1) {
        return false;
      } else {
        return true;
      }
    },

    expand: function() {
      $(this.el).find('span').first().addClass('icon-minus').removeClass('icon-plus');
      $(this.el).children().children().filter('ul').show('fast');
    },

    collapse: function() {
      $(this.el).find('span').first().addClass('icon-plus').removeClass('icon-minus');
      $(this.el).children().children().filter('ul').hide('fast');
    },

    load_nodes: function(data) {
      this.collection.add(data);
    }

  });

});