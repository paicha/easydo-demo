define(['marionette', 'controllers/SalesController'], function (Marionette, SalesController) {

  return Marionette.AppRouter.extend({
    
    controller: SalesController,
    
    appRoutes: {
      "sales" : "SalesPage"
    }

  });

});