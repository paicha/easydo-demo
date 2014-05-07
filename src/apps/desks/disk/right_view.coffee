define [
  'underscore'
  'marionette'
  'text!apps/desks/disk/tmpl/right.html'
], (_, Marionette, RightTemplate) ->

  Marionette.ItemView.extend

    template: _.template(RightTemplate)

    triggers:
      'click .uploadFile': 'file:upload'
      'click .createFolder': 'file:createFolder'