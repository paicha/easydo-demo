define [
  'underscore'
  'marionette'
  'text!apps/desks/disk/tmpl/form.html'
], (_, Marionette, FormTemplate) ->

  Marionette.ItemView.extend

    className: 'modal-dialog'

    template: _.template(FormTemplate)

    templateHelpers:
      getTitle: ->
        if true then '新建文件夹' else '上传文件' #TODO 判断

    triggers:
      submit: 'file:save'