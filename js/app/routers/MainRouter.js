define(['marionette', 'controllers/MainController'], function (Marionette, MainController) {

  return Marionette.AppRouter.extend({

    controller: MainController,

    appRoutes: {
      'desks/disk' : 'disk',
    }
  });

});