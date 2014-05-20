define [
    'underscore'
    'marionette'
    'text!apps/desks/disk/tmpl/list.html'
    'apps/desks/disk/content_item_view'
], (_, Marionette, ListTemplate, ContentItemView) ->

    Marionette.CompositeView.extend

        template: _.template(ListTemplate)

        itemView: ContentItemView

        triggers:
            'click .share': 'file:share'

        appendHtml: (collectionView, itemView) ->
            collectionView.$('tbody').append itemView.el