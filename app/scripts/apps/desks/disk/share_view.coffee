define [
    'underscore'
    'marionette'
    'text!apps/desks/disk/tmpl/share.html'
], (_, Marionette, Template) ->

    Marionette.ItemView.extend

        className: 'modal-dialog'

        template: _.template(Template)

        triggers:
            'click .showSelected': 'showSelected'

        onClose: ->
            $('[class^="select2-"]').remove()