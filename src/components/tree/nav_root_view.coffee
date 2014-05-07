define [
    'underscore'
    'marionette'
    'components/tree/nav_node_view'
], (_, Marionette, NavNodeView) ->

    Marionette.CollectionView.extend

        initialize: (options) ->
            @controller = options.controller
            return

        className: 'navtree'

        itemView: NavNodeView

        itemViewOptions: ->
            controller: @controller

        collapse: ->
            $(@el).find('li > ul').hide()
            return

        loadCss: (url) ->
            link = document.createElement 'link'
            link.type = 'text/css'
            link.rel = 'stylesheet'
            link.href = url
            document.getElementsByTagName('head')[0].appendChild link
            return

