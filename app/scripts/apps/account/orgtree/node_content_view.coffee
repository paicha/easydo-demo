define [
    'underscore'
    'marionette'
], (_, Marionette) ->

    Marionette.ItemView.extend template: _.template('子节点')