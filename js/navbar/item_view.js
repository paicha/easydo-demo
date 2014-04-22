define([
  'underscore',
  'marionette',
  'text!navbar/tmpl/item.html'
], function(_, Marionette, ItemTemplate) {

  return Marionette.ItemView.extend({

    tagName: 'li',

    template: _.template(ItemTemplate),

  });

});