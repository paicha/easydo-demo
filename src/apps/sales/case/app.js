// Generated by CoffeeScript 1.7.1
define(['app', 'marionette', 'apps/sales/case/controller'], function(App, Marionette, Controller) {
  var CaseApp, CaseRouter;
  CaseApp = App.module('SalesApp.CaseApp', {
    startWithParent: false
  });
  CaseRouter = Marionette.AppRouter.extend({
    before: function() {
      App.startSubApp('SalesApp');
      App.SalesApp.startSubApps('SalesApp.CaseApp');
    },
    controller: Controller,
    appRoutes: {
      'sales-case': 'caseApp'
    }
  });
  App.addInitializer(function() {
    new CaseRouter();
  });
  return CaseApp;
});