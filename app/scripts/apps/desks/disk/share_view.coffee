define [
    'underscore'
    'marionette'
    'text!apps/desks/disk/tmpl/share.html'
    'components/member_selector/scripts/controller'
], (_, Marionette, Template, SelectorComponent) ->

    Marionette.ItemView.extend

        className: 'modal-dialog'

        template: _.template(Template)

        triggers:
            'click .showSelected': 'showSelected'

        init: ->
            # 初始化选择组件
            @selectView = new SelectorComponent
                inputId: "#disk-select-share"
                multiple: true
                selectable: ['ou', 'group', 'person']

            # 监听事件
            that = this
            @selectView.on 'deselect', (node) ->
                # 继续往 controller 抛出
                that.trigger 'deselect', node
            @selectView.on 'select', (node) ->
                that.trigger 'select', node

        onClose: ->
            @selectView.destroy()

        get_selected: ->
            @selectView.get_selected()