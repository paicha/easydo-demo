define [
  'underscore'
  'marionette'
  'text!apps/sales/tabs/tmpl/tabs.html'
], (_, Marionette, TabsTemplate) ->

  Marionette.ItemView.extend

    template: _.template(TabsTemplate)

    setCurrent: (appName) ->
      appName = appName.replace('.', '-')
      $('#tabs-' + appName).tab 'show'
      return