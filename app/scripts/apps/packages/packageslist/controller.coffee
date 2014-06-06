define [
    'underscore'
    'marionette'
    'app'
    'apps/packages/packageslist/content_view'
], (_, Marionette, App, ContentView) ->

    Controller =
        packagesList: ->
            contentview = new ContentView()
            App.pagecontent.show contentview