define 'lodashTmpl', ["lodash"], (_) ->
    _.templateSettings =
        evaluate: /\{\{#([\s\S]+?)\}\}/g
        interpolate: /\{\{[^#\{]([\s\S]+?)[^\}]\}\}/g
        escape: /\{\{\{([\s\S]+?)\}\}\}/g
    _

require.config
    paths:
        backbone: '../bower_components/backbone/backbone'
        marionette: '../bower_components/marionette/lib/core/backbone.marionette'
        text: '../bower_components/requirejs-text/text'
        jquery: '../bower_components/jquery/dist/jquery'
        lodash: '../bower_components/lodash/dist/lodash'
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
        localStorage: '../bower_components/backbone.localStorage/backbone.localStorage'
        routeFilter: '../bower_components/backbone.routeFilter/dist/backbone.routeFilter'
        treeview: '../bower_components/backbone.marionette.treeview/dist/scripts/c44b7e7a.treeview'
        select2: '../bower_components/select2/select2'
        ace: '../bower_components/ace-builds/src-noconflict/ace'
        joint: '../bower_components/joint/dist/joint.clean'
        vectorizer: '../bower_components/joint/src/vectorizer'
        geometry: '../bower_components/joint/src/geometry'
        backgrid: '../bower_components/backgrid/lib/backgrid'
        paginator: '../bower_components/backbone.paginator/lib/backbone.paginator'
        backboneForms: '../bower_components/backbone-forms/distribution.amd/backbone-forms'

    shim:
        backbone:
            deps: [
                'lodash'
                'jquery'
            ]
            exports: 'Backbone'

        marionette:
            deps: [
                'backbone'
                'localStorage'
                'routeFilter'
                'paginator'
            ]
            exports: 'Marionette'

        bootstrap:
            deps: ['jquery']

        select2:
            deps: ['jquery']

        ace:
            exports: 'ace'

        backgrid:
            deps: [
                'jquery'
                'backbone'
                'lodash'
            ]
            exports: 'Backgrid'

        joint:
            deps: [
                'geometry'
                'vectorizer'
                'jquery'
                'lodash'
                'backbone'
            ]
            exports: 'joint'
            init: (geometry, vectorizer)->
                @g = geometry
                @V = vectorizer
                return

        lodash: 
            exports: '_'

    map:
        '*':
            underscore: 'lodashTmpl'

# start App
require [
    'app'
    'jquery'
    'underscore'
    'bootstrap'
    
    # entities
    'entities/navbar'
    'entities/orgtree'
    'entities/packages'
    'entities/member_select'
    # apps
    'apps/desks/app'
    'apps/sales/app'
    'apps/account/app'
    'apps/packages/app'
], (App) ->
    App.start()
