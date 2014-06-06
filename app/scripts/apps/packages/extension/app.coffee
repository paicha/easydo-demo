define [
    'app'
    'marionette'
    'apps/packages/extension/navtree/controller'
    'apps/packages/extension/detail/app'
    'apps/packages/extension/code/app'
    'apps/packages/extension/flow_chart/app'
    'apps/packages/extension/forms/app'
    'apps/packages/extension/setting/app'
], (App, Marionette, NavTree, DetailApp, CodeApp, FlowChartApp, FormsApp, SettingApp) ->

    extension = App.module 'packagesApp.extension', startWithParent: false

    extension.on 'start', ->
        navtree = new NavTree()
        navtree.show()
        extension.on 'app:extension:started', navtree.setCurrentNode, navtree

    extension.on 'stop', ->
        App.pageleft.reset()
        App.pagecontent.reset()
        extension.currentApp = ''

    extension.startSubApps = (appName) ->
        currentApp = App.module(appName)
        if extension.currentApp is currentApp then return
        if extension.currentApp then extension.currentApp.stop()
        extension.currentApp = currentApp
        currentApp.start()
        extension.trigger 'app:extension:started', appName

    extension