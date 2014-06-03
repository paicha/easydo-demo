define [
    'app'
], (App) ->

    @cache = {}
    that = this
    API =
        getAll: (url) ->
            deferred = $.Deferred()
            @_getSelect ((data) -> deferred.resolve data), url
            deferred.promise()

        _getSelect: (callback, url) ->
            if url of that.cache
                callback that.cache[url]
            else
                $.get url, (data) ->
                    callback data
                    that.cache[url] = data

    App.reqres.setHandler 'memberSelect:entities', (term, currentNodeId) ->
        # 点击节点
        if currentNodeId and term is ""
            url = "api/member_select_node_#{currentNodeId}.json"
        # 历史记录
        else if term is "" and not currentNodeId
            url = "api/member_select_history.json"
        # 搜索
        else if term isnt ""
            url = "api/member_select_search_#{term}.json"
        API.getAll url