define [
    'underscore'
    'marionette'
    'backbone'
    'app'
    'apps/packages/extension/code/content_view'
    'ace'
], (_, Marionette, Backbone, App, ContentView, ace) ->

    Controller = Marionette.Controller.extend
        CodeApp: ->
            contentview = new ContentView()
            App.pagecontent.show contentview

        CodeItem: (extensionName, codeId) ->

            contentview = new ContentView()
            App.pagecontent.show contentview

            code = '<pre id="code"></pre>'
            $('#show').html(code)

            editor = ace.edit "code" # DOM id
            editor.setValue 'print "Hello World!"\n# 123\n# 123\n', 1
            editor.setTheme "ace/theme/chrome"
            editor.getSession().setMode "ace/mode/python" # 语法
            @trigger('clickNode', codeId)