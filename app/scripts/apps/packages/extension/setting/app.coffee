define [
    'app'
    'marionette'
    'apps/packages/extension/setting/controller'
], (App, Marionette, Controller) ->

    SettingApp = App.module 'packagesApp.extension.setting', startWithParent: false

    SettingApp.on 'stop', ->
        App.pagecontent.reset()

    SettingRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'packagesApp'
            App.packagesApp.startSubApps 'packagesApp.extension'
            App.packagesApp.extension.startSubApps 'DesksApp.packagesApp.extension.setting'
        
        controller: new Controller()

        appRoutes:
            'packages-:extensionName-setting': 'SettingApp'

    App.addInitializer ->
        new SettingRouter()

    SettingApp