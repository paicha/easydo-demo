define [
    'app'
    'marionette'
    'apps/account/orgtree/controller'
], (App, Marionette, Controller) ->

    OrgtreeApp = App.module 'AccountApp.OrgtreeApp', startWithParent: false

    OrgtreeApp.on 'start', ->
        Controller.orgTreeApp()

    OrgtreeApp.on 'stop', ->
        App.pageleft.reset()

    OrgtreeRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'AccountApp'
            App.AccountApp.startSubApps 'AccountApp.OrgtreeApp'

        controller: Controller

        appRoutes:
            'account-orgtree-:id': 'treeNode'

    App.addInitializer ->
        App.router = new OrgtreeRouter()

    OrgtreeApp