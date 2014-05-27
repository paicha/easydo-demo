define ['app'], (App) ->

    API =
        getAll: (url) ->
            deferred = $.Deferred()
            @_getSelect ((data) -> deferred.resolve data), url
            deferred.promise()

        _getSelect: (callback, url) ->
            $.get url, (data) ->
                callback data

    App.reqres.setHandler 'diskShareSelect:entities', (url) ->
        API.getAll url