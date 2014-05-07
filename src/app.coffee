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
            return

        hideModal: ->
            @$el.modal 'hide'
            return

    App.addRegions
        navbar: '#navbar'
        pagetabs: '#page-tabs'
        pageleft: '#page-left'
        pagecontent: '#page-content'
        pageright: '#page-right'
        modal: ModalRegion

    App.pageleft.on 'before:show', (view) ->
        $('#page-left').removeClass 'hidden'
        return

    App.pageright.on 'before:show', (view) ->
        $('#page-right').removeClass 'hidden'
        return

    App.addInitializer ->
        navController = new NavController()
        navController.showNavbar App.navbar
        App.vent.on 'app:started', navController.setCurrentApp, navController
        return

    App.on 'initialize:after', ->
        Backbone.history.start()    if Backbone.history
        return

    App.startSubApp = (appName, args) ->
        currentApp = App.module(appName)
        return    if App.currentApp is currentApp
        App.currentApp.stop()    if App.currentApp
        App.currentApp = currentApp
        currentApp.start args
        App.vent.trigger 'app:started', appName
        return

    App