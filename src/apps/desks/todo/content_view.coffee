define [
  'underscore'
  'marionette'
  'text!apps/desks/todo/tmpl/content.html'
], (_, Marionette, ContentTemplates) ->

  Marionette.ItemView.extend
    className: 'col-sm-8'
    template: _.template(ContentTemplates)