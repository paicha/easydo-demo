define [
    'underscore'
    'marionette'
    'backbone'
    'app'
    'apps/sales/case/content_view'
], (_, Marionette, Backbone, App, ContentView) ->

    controller = caseApp: ->
        contentview = new ContentView()
        App.pagecontent.show contentview