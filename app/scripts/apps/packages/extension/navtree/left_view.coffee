define [
    'underscore'
    'marionette'
    'text!apps/packages/extension/navtree/tmpl/left.html'
], (_, Marionette, Template) ->

    Marionette.ItemView.extend

        template: _.template(Template)

        setCurrent: (node1, appName, treeView) ->
            # 取出app名字
            appName = appName.match('[^\.]+$')+''
            switch appName
                when 'detail' then node2 = node1
                when 'forms' then node2 = 'forms'
                when 'flowchart' then node2 = 'flowchart'
                when 'code' then node2 = 'code'
                else node2 = 'setting'
            treeView.get_node_by_path [node1, node2], (node) ->
                node.activate()