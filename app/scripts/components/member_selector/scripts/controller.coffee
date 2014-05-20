define [
	'jquery'
    'underscore'
    'marionette'
    'backbone'
    'components/member_selector/scripts/view'
    'select2'
], ($, _, Marionette, Backbone, SelectView) ->

    Controller = Marionette.Controller.extend

        initialize: (options) ->
            @selectView = new SelectView()

        render: (dom) ->
            @selectView.render()
            $(dom).html @selectView.el
            $('#e1').select2()