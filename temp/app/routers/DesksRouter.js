define(['marionette', 'controllers/DesksController'], function (Marionette, DesksController) {

  return Marionette.AppRouter.extend({
    
    controller: DesksController,
    
    appRoutes: {
      "desks" : "DesksPage",
      "desks/todo" : "DesksTodo"
    }

  });

});