define [
    'underscore'
    'marionette'
    'backbone'
    'apps/packages/tabs/tabs_view'
], (_, Marionette, Backbone, TabsView) ->

    Controller = Marionette.Controller.extend

        showTabs: (regions) ->
            @tabsview = new TabsView()
            regions.show @tabsview

        setCurrentApp: (appName) ->
            @tabsview.setCurrent appName