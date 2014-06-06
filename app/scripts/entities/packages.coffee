define ['app'], (App) ->

    API =
        getAll: (url) ->
            deferred = $.Deferred()
            @_getTree ((data) -> deferred.resolve data), url
            deferred.promise()

        _getTree: (callback, url) ->
            $.get url, (data) ->
                callback data

    App.reqres.setHandler 'packages:entities', (id) ->
        if typeof id is "undefined"
            url = "api/packages.json"
        else
            url = "api/packages_#{id}.json"
        API.getAll url