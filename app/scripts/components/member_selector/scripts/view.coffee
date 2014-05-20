define [
    'underscore'
    'marionette'
    'text!components/member_selector/tmpl/selector.html'
], (_, Marionette, Template) ->

    Marionette.ItemView.extend template: _.template(Template)