define [
    'underscore'
    'marionette'
    'text!apps/packages/tabs/tmpl/tabs.html'
], (_, Marionette, TabsTemplates) ->

    Marionette.ItemView.extend

        template: _.template(TabsTemplates)

        setCurrent: (appName) ->
            appName = appName.replace('.', '-')
            $("#tabs-#{appName}").tab 'show'