define(['marionette', 'controllers/FileController'], function (Marionette, FileController) {

  return Marionette.AppRouter.extend({
    
    controller: FileController,
    
    appRoutes: {
      "desks/files" : "Filelist",
    }

  });

});