define ['app'], (App) ->

    API =
        getAll: (url) ->
            deferred = $.Deferred()
            @_getTree ((data) -> deferred.resolve data), url
            deferred.promise()

        _getTree: (callback, url) ->
            $.get url, (data) ->
                callback data

    App.reqres.setHandler 'orgtree:entities', (id) ->
        if typeof id is "undefined"
            url = "api/orgtree.json"
        else
            url = "api/#{id}.json"
        API.getAll url