define [
  'underscore'
  'marionette'
  'text!navbar/tmpl/item.html'
], (_, Marionette, ItemTemplate) ->
  Marionette.ItemView.extend

    tagName: 'li'

    template: _.template ItemTemplate