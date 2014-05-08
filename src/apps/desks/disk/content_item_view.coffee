define [
    'underscore'
    'marionette'
    'text!apps/desks/disk/tmpl/item.html'
], (_, Marionette, ItemTemplate) ->

    Marionette.ItemView.extend

        tagName: 'tr'

        template: _.template(ItemTemplate)

        triggers:
            'click .delete': 'file:delete'

        initialize: ->
            @listenTo @model, 'change', @render, this
            @listenTo @model, 'destroy', @render, this