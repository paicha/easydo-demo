define [
    'app'
    'marionette'
    'apps/desks/page_nav/controller'
    'apps/desks/disk/app'
    'apps/desks/todo/app'
], (App, Marionette, Controller, DiskApp, TodoApp) ->

    DesksApp = App.module 'DesksApp', startWithParent: false

    DesksApp.on 'start', ->
        controller = new Controller()
        controller.showPageNav App.pageleft
        DesksApp.on 'app:desks:started', controller.setCurrentApp, controller

    DesksApp.on 'stop', ->
        App.pagetabs.reset()
        App.pageleft.reset()
        App.pageright.reset()
        # 清空记录的当前应用
        DesksApp.currentApp = ''

    DesksApp.startSubApps = (appName) ->
        currentApp = App.module(appName)
        return    if DesksApp.currentApp is currentApp
        DesksApp.currentApp.stop()    if DesksApp.currentApp
        DesksApp.currentApp = currentApp
        currentApp.start()
        DesksApp.trigger 'app:desks:started', appName

    DesksApp
