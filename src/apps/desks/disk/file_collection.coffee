define ['apps/desks/disk/file_model'], (FileModel) ->

    Backbone.Collection.extend
        model: FileModel

        localStorage: new Backbone.LocalStorage('backbone-mar')
 
        parse: (resp, options) ->
            resp

