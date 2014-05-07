define [
  'underscore'
  'marionette'
  'backbone'
  'app'
  'apps/desks/todo/content_view'
], (_, Marionette, Backbone, App, ContentView) ->

  controller = TodoApp: ->
    contentview = new ContentView()
    App.pagecontent.show contentview
    return

  controller