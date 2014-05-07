define [
  'app'
  'backbone'
], (App, Backbone) ->
  Entities = App.module 'Entities'
  Entities.Collection = Backbone.Collection.extend()
  return
