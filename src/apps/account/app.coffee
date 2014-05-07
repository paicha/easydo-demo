define [
    'app'
    'marionette'
    'apps/account/tabs/controller'
    'apps/account/userlist/app'
    'apps/account/orgtree/app'
], (App, Marionette, Controller, UserlistApp, OrgtreeApp) ->

    AccountApp = App.module 'AccountApp', startWithParent: false

    AccountApp.on 'start', ->
        controller = new Controller()
        controller.showTabs App.pagetabs
        AccountApp.on 'app:account:started', controller.setCurrentApp, controller
        return

    AccountApp.on 'stop', ->
        App.pagetabs.reset()
        # 清空记录的当前应用
        AccountApp.currentApp = ''
        return

    AccountApp.startSubApps = (appName) ->
        currentApp = App.module(appName)
        return    if AccountApp.currentApp is currentApp
        AccountApp.currentApp.stop()    if AccountApp.currentApp
        AccountApp.currentApp = currentApp
        currentApp.start()
        AccountApp.trigger 'app:account:started', appName
        return

    AccountApp