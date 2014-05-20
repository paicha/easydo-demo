define [
    'underscore'
    'marionette'
    'text!apps/desks/disk/tmpl/share.html'
], (_, Marionette, Template) ->

    Marionette.ItemView.extend

        className: 'modal-dialog'

        template: _.template(Template)

###        templateHelpers:
            getTitle: ->
                if true then '新建文件夹' else '上传文件' #TODO 判断

        triggers:
            submit: 'file:save'###