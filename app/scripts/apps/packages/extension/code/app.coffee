define [
    'app'
    'marionette'
    'apps/packages/extension/code/controller'
], (App, Marionette, Controller) ->

    CodeApp = App.module 'packagesApp.extension.code', startWithParent: false

    controller = new Controller()

    controller.on 'clickNode', (NodeID)->
        console.log NodeID

    CodeApp.on 'stop', ->
        App.pagecontent.reset()

    codeRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'packagesApp'
            App.packagesApp.startSubApps 'packagesApp.extension'
            App.packagesApp.extension.startSubApps 'DesksApp.packagesApp.extension.code'

        controller: controller

        appRoutes:
            'packages-:extensionName-code': 'CodeApp'
            'packages-:extensionName-code-:codeId': 'CodeItem'

    App.addInitializer ->
        new codeRouter()

    CodeApp