define [
  'underscore'
  'marionette'
  'text!apps/account/userlist/tmpl/content.html'
], (_, Marionette, templates) ->

  Marionette.ItemView.extend template: _.template(templates)