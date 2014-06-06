define [
    'app'
    'marionette'
    'apps/packages/extension/flow_chart/controller'
], (App, Marionette, Controller) ->

    FlowChartApp = App.module 'packagesApp.extension.flowchart', startWithParent: false

    FlowChartApp.on 'stop', ->
        App.pagecontent.reset()

    FlowChartRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'packagesApp'
            App.packagesApp.startSubApps 'packagesApp.extension'
            App.packagesApp.extension.startSubApps 'DesksApp.packagesApp.extension.flowchart'
        
        controller: new Controller()

        appRoutes:
            'packages-:extensionName-flowchart': 'FlowChartApp'
            'packages-:extensionName-flowchart-:flowchartId': 'FlowChartItem'

    App.addInitializer ->
        new FlowChartRouter()

    FlowChartApp