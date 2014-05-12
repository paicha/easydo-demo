require.config

    deps: ['app']
    paths:        
        # folders
        libs: 'libs'
        # libs
        text: 'libs/text'
        jquery: 'libs/jquery'
        underscore: 'libs/underscore'
        backbone: 'libs/backbone'
        marionette: 'libs/backbone.marionette'
        bootstrap: 'libs/bootstrap'
        localStorage: 'libs/backbone.localStorage'
        babysitter: 'libs/backbone.babysitter'
        compute: 'libs/backbone.compute'
        routefilter: 'libs/backbone.routefilter'

    shim:
        underscore:
            exports: '_'
            init: ->
                @_.templateSettings =
                    evaluate: /\{\{#([\s\S]+?)\}\}/g # {{# console.log('meh') }}
                    interpolate: /\{\{[^#\{]([\s\S]+?)[^\}]\}\}/g # {{ title }}
                    escape: /\{\{\{([\s\S]+?)\}\}\}/g # {{{ title }}}
                _

        backbone:
            deps: [
                'underscore'
                'jquery'
            ]
            exports: 'Backbone'

        marionette:
            deps: [
                'backbone'
                'localStorage'
                'routefilter'
            ]
            exports: 'Marionette'

        bootstrap:
            deps: ['jquery']


# start App
require [
    'backbone'
    'underscore'
    'bootstrap'
    'app'
    # entities
    'entities/navbar'
    'entities/orgtree'
    # apps
    'apps/desks/app'
    'apps/sales/app'
    'apps/account/app'
], (Backbone, _, bootstrap, App, NavbarEntities, OrgTreeEntities, DesksApp, SalesApp, AccountApp) ->
    require ['compute']
    App.start()