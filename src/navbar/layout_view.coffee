define [
  'underscore'
  'marionette'
  'text!navbar/tmpl/layout.html'
], (_, Marionette, LayoutTemplate) ->
  Marionette.Layout.extend

    template: _.template(LayoutTemplate)

    regions:
      left: '#nav-left'
      right: '#nav-right'