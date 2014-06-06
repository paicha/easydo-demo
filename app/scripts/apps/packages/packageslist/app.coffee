define [
    'app'
    'marionette'
    'apps/packages/packageslist/controller'
], (App, Marionette, Controller) ->

    packagesList = App.module 'packagesApp.list', startWithParent: false

    packagesListAppRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'packagesApp'
            App.packagesApp.startSubApps 'packagesApp.list'

        controller: Controller

        appRoutes:
            'packages': 'packagesList'

    App.addInitializer ->
        new packagesListAppRouter()

    packagesList