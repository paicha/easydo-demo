define [
    'app'
    'marionette'
    'apps/desks/disk/controller'
], (App, Marionette, Controller) ->

    DiskApp = App.module 'DesksApp.DiskApp', startWithParent: false
    
    DiskApp.on 'stop', ->
        App.pageright.reset()

    DiskRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'DesksApp'
            App.DesksApp.startSubApps 'DesksApp.DiskApp'

        controller: Controller

        appRoutes:
            'desks-disk': 'DiskApp'

    App.addInitializer ->
        new DiskRouter()

    DiskApp