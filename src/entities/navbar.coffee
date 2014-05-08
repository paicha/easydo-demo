define [
    'app'
    'backbone'
    'entities/_base/collections'
    'entities/_base/models'
], (App, Backbone, EntitiesCollections, EntitiesModels) ->

    NavModel = App.Entities.Model.extend()

    NavbarCollection = App.Entities.Collection.extend
        model: NavModel
        url: 'api/navbar.json'

    API =
        getAll: ->
            deferred = $.Deferred()
            @_getNavbar (navbarCollection) ->
                deferred.resolve navbarCollection
            deferred.promise()

        _getNavbar: (callback) ->
            navbarCollection = new NavbarCollection()
            navbarCollection.on 'reset', callback
            navbarCollection.fetch reset: true

    App.reqres.setHandler 'navbar:entities', ->
        API.getAll()