define [
    'underscore'
    'marionette'
    'backbone'
    'apps/desks/page_nav/left_view'
], (_, Marionette, Backbone, LeftView) ->

    Controller = Marionette.Controller.extend

        showPageNav: (regions) ->
            @leftview = new LeftView()
            regions.show @leftview

        setCurrentApp: (appName) ->
            @leftview.setCurrent appName