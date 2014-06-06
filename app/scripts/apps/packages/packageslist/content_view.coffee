define [
    'underscore'
    'marionette'
    'text!apps/packages/packageslist/tmpl/content.html'
], (_, Marionette, templates) ->

    Marionette.ItemView.extend
    	template: _.template(templates)