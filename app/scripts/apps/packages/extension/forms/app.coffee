define [
    'app'
    'marionette'
    'apps/packages/extension/forms/controller'
], (App, Marionette, Controller) ->

    FormsApp = App.module 'packagesApp.extension.forms', startWithParent: false

    FormsApp.on 'stop', ->
        App.pagecontent.reset()

    FormsRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'packagesApp'
            App.packagesApp.startSubApps 'packagesApp.extension'
            App.packagesApp.extension.startSubApps 'DesksApp.packagesApp.extension.forms'
        
        controller: new Controller()

        appRoutes:
            'packages-:extensionName-forms': 'FormsApp'
            'packages-:extensionName-forms-:formId': 'FormsItem'

    App.addInitializer ->
        new FormsRouter()

    FormsApp