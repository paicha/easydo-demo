define [
    'app'
    'marionette'
    'apps/account/userlist/controller'
], (App, Marionette, Controller) ->

    UserlistApp = App.module 'AccountApp.UserlistApp', startWithParent: false

    UserlistRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'AccountApp'
            App.AccountApp.startSubApps 'AccountApp.UserlistApp'

        controller: Controller

        appRoutes:
            'account-userlist': 'UserlistApp'

    App.addInitializer ->
        new UserlistRouter()

    UserlistApp