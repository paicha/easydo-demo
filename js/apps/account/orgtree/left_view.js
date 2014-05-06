define([
  'underscore',
  'marionette',
  'text!apps/account/orgtree/tmpl/left.html'
], function(_, Marionette, Template) {

  return Marionette.ItemView.extend({

    template: _.template(Template),

    triggers: {
      'click .checked': 'showCheckedList',
      'click .getNodeId': 'getNode',
      'click .expandNode': 'expandNode'
    }
  });

});