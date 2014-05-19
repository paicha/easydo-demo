define [
    'underscore'
    'marionette'
    'text!navbar/tmpl/right.html'
], (_, Marionette, RightTemplate) ->
    Marionette.CompositeView.extend

        template: _.template(RightTemplate)

        events:
            'click #nav-edit': 'nav-edit'

        #initialize: (options) ->
        #    _.bindAll this
                