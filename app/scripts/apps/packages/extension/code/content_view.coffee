define [
    'underscore'
    'marionette'
    'text!apps/packages/extension/code/tmpl/content.html'
], (_, Marionette, Templates) ->

    Marionette.ItemView.extend
        className: 'col-sm-8'
        template: _.template(Templates)