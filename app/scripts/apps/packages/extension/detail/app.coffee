define [
    'app'
    'marionette'
    'apps/packages/extension/detail/controller'
], (App, Marionette, Controller) ->

    detailApp = App.module 'packagesApp.extension.detail', startWithParent: false

    detailApp.on 'stop', ->
        App.pagecontent.reset()

    datilRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'packagesApp'
            App.packagesApp.startSubApps 'packagesApp.extension'
            App.packagesApp.extension.startSubApps 'DesksApp.packagesApp.extension.detail'

        controller: new Controller()

        appRoutes:
            'packages-:extensionName-detail': 'detailApp'

    App.addInitializer ->
        new datilRouter()

    detailApp