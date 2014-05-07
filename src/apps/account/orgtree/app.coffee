define [
    'app'
    'marionette'
    'apps/account/orgtree/controller'
], (App, Marionette, Controller) ->

    OrgtreeApp = App.module 'AccountApp.OrgtreeApp', startWithParent: false

    OrgtreeApp.on 'start', ->
        Controller.orgTreeApp()
        return

    OrgtreeApp.on 'stop', ->
        App.pageleft.reset()
        return

    OrgtreeRouter = Marionette.AppRouter.extend

        before: ->
            App.startSubApp 'AccountApp'
            App.AccountApp.startSubApps 'AccountApp.OrgtreeApp'
            return

        controller: Controller

        appRoutes:
            'account-orgtree-:id': 'treeNode'

    App.addInitializer ->
        App.router = new OrgtreeRouter()
        return

    OrgtreeApp