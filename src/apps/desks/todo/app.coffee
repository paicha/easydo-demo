define [
    'app'
    'marionette'
    'apps/desks/todo/controller'
], (App, Marionette, Controller) ->

    TodoApp = App.module 'DesksApp.TodoApp', startWithParent: false

    TodoRouter = Marionette.AppRouter.extend
        before: ->
            App.startSubApp 'DesksApp'
            App.DesksApp.startSubApps 'DesksApp.TodoApp'
            return

        controller: Controller

        appRoutes:
            'desks-todo': 'TodoApp'

    App.addInitializer ->
        new TodoRouter()
        return

    TodoApp