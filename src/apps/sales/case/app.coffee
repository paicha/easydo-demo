define [
    'app'
    'marionette'
    'apps/sales/case/controller'
], (App, Marionette, Controller) ->

    CaseApp = App.module 'SalesApp.CaseApp', startWithParent: false

    CaseRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'SalesApp'
            App.SalesApp.startSubApps 'SalesApp.CaseApp'
            return

        controller: Controller

        appRoutes:
            'sales-case': 'caseApp'

    App.addInitializer ->
        new CaseRouter()
        return

    CaseApp