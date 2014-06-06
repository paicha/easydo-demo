define [
    'underscore'
    'marionette'
    'backbone'
    'app'
    'apps/packages/extension/detail/content_view'
], (_, Marionette, Backbone, App, ContentView) ->

    Controller = Marionette.Controller.extend
        detailApp: ->
            contentview = new ContentView()
            App.pagecontent.show contentview
