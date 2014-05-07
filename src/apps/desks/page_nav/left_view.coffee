define [
    'underscore'
    'marionette'
    'text!apps/desks/page_nav/tmpl/left.html'
], (_, Marionette, LeftTemplates) ->

    Marionette.ItemView.extend

        template: _.template(LeftTemplates)

        setCurrent: (appName) ->
            appName = appName.replace('.', '-')
            $('#' + appName).tab 'show'
            return