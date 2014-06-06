define [
    'underscore'
    'marionette'
    'backbone'
    'app'
    'apps/packages/extension/setting/content_view'
], (_, Marionette, Backbone, App, ContentView) ->

    Controller = Marionette.Controller.extend
    	SettingApp: ->
        	contentview = new ContentView()
        	App.pagecontent.show contentview