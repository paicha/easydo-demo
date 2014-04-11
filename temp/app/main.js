require([
  // Libraries
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  // Main App Object
  'app',
  // Application routers
  'routers/MainRouter',
  'routers/SalesRouter'
],

function ($, _, Backbone, bootstrap, App, MainRouter, SalesRouter) {



  // Start the app
  var options = {
    routers: {
      main  : MainRouter,
      sales : SalesRouter
    }
  };
  
  App.start(options);

});