define [
    'underscore'
    'marionette'
    'backbone'
    'navbar/layout_view'
    'navbar/left_view'
    'navbar/right_view'
], (_, Marionette, Backbone, LayoutView, LeftView, RightView) ->

    Controller = Marionette.Controller.extend

        showNavbar: (regions) ->
            @regions = regions
            func = _.bind(this._showNavbar, @)
            App = require 'app'
            $.when App.request 'navbar:entities'
                .then func
            return

        _showNavbar: (navbarCollection) ->
            layoutview = new LayoutView()
            @leftview = new LeftView collection: navbarCollection
            rightview = new RightView()

            @regions.show layoutview
            layoutview.left.show @leftview
            layoutview.right.show rightview

            @leftview.setCurrent @selected_app
            return

        setCurrentApp: (appName) ->
            @selected_app = appName
            # 首次加载由于异步操作，导航数据还未加载渲染，临时保存appName
            @leftview.setCurrent appName if @leftview

    Controller