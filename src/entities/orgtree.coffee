define ['app'], (App) ->

    API =
        getAll: (url) ->
            deferred = $.Deferred()
            @_getTree ((data) ->
                deferred.resolve data
                return
            ), url
            deferred.promise()

        _getTree: (callback, url) ->
            $.get url, (data) ->
                callback eval(data)
                return

            return

    App.reqres.setHandler 'orgtree:entities', (url) ->
        API.getAll url

    return
