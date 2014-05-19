define 'underscoreTmpl', ["underscore"], (_) ->
  _.templateSettings =
    evaluate: /\{\{#([\s\S]+?)\}\}/g
    interpolate: /\{\{[^#\{]([\s\S]+?)[^\}]\}\}/g
    escape: /\{\{\{([\s\S]+?)\}\}\}/g
  _

require.config
    paths:
        text: '../scripts/vendor/text'
        jquery: '../scripts/vendor/jquery'
        underscore: '../scripts/vendor/underscore'
        backbone: '../scripts/vendor/backbone'
        marionette: '../scripts/vendor/backbone.marionette'
        bootstrap: '../scripts/vendor/bootstrap'
        localStorage: '../scripts/vendor/backbone.localStorage'
        routeFilter: '../scripts/vendor/backbone.routeFilter'
        treeview: '../scripts/vendor/treeview'
    shim:
        backbone:
            deps: [
                'underscoreTmpl'
                'jquery'
            ]
            exports: 'Backbone'

        marionette:
            deps: [
                'backbone'
                'localStorage'
                'routeFilter'
            ]
            exports: 'Marionette'

        bootstrap:
            deps: ['jquery']
    map:
        '*':
            underscore:'underscoreTmpl'
        'underscoreTmpl':
            underscore: 'underscore'

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
    App.start()