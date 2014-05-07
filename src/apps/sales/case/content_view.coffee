define [
  'underscore'
  'marionette'
  'text!apps/sales/case/tmpl/content.html'
], (_, Marionette, ContentTemplate) ->

  Marionette.ItemView.extend template: _.template(ContentTemplate)