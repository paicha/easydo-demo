define [
    'underscore'
    'marionette'
    'app'
    'apps/account/userlist/content_view'
], (_, Marionette, App, ContentView) ->

    Controller = UserlistApp: ->
        contentview = new ContentView()
        App.pagecontent.show contentview
        App.pageleft.close()
        App.pageright.close()