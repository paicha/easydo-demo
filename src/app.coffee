define [
    'backbone'
    'marionette'
    'navbar/controller'
], (Backbone, Marionette, NavController) ->

    App = new Marionette.Application()

    ModalRegion = Marionette.Region.extend

        el: '#modal'

        onShow: (view) ->
            view.on 'close', @hideModal, this
            @$el.modal 'show'

        hideModal: ->
            @$el.modal 'hide'

    App.addRegions
        navbar:      '#navbar'
        pagetabs:    '#page-tabs'
        pageleft:    '#page-left'
        pagecontent: '#page-content'
        pageright:   '#page-right'
        modal:       ModalRegion

    App.pageleft.on 'before:show', (view) ->
        $('#page-left').removeClass 'hidden'

    App.pageright.on 'before:show', (view) ->
        $('#page-right').removeClass 'hidden'

    App.addInitializer ->
        navController = new NavController()
        navController.showNavbar App.navbar
        App.vent.on 'app:started', navController.setCurrentApp, navController

    App.on 'initialize:after', ->
        if Backbone.history then Backbone.history.start()

    App.startSubApp = (appName, args) ->
        currentApp = App.module(appName)
        if App.currentApp is currentApp then return
        if App.currentApp then App.currentApp.stop()
        App.currentApp = currentApp
        currentApp.start args
        App.vent.trigger 'app:started', appName

    App