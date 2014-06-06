define [
    'app'
    'marionette'
    'apps/packages/tabs/controller'
    'apps/packages/packageslist/app'
    'apps/packages/extension/app'
], (App, Marionette, TabsController, packagesList, extension) ->

    packagesApp = App.module 'packagesApp', startWithParent: false

    packagesApp.on 'start', ->
        # 显示「应用市场」标题
        tabsController = new TabsController()
        tabsController.showTabs App.pagetabs

    packagesApp.on 'stop', ->
        App.pagetabs.reset()
        App.pagecontent.reset()
        packagesApp.currentApp = ''

    packagesApp.startSubApps = (appName) ->
        currentApp = App.module(appName)
        if packagesApp.currentApp is currentApp then return
        if packagesApp.currentApp then packagesApp.currentApp.stop()
        packagesApp.currentApp = currentApp
        currentApp.start()

    packagesApp