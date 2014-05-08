define ['app'], (App) ->

    API =
        getAll: (url) ->
            deferred = $.Deferred()
            @_getTree ((data) -> deferred.resolve data), url
            deferred.promise()

        _getTree: (callback, url) ->
            $.get url, (data) ->
                callback eval(data)

    App.reqres.setHandler 'orgtree:entities', (url) ->
        API.getAll url