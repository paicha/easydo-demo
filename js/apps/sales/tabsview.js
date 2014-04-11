define([
  'underscore',
  'marionette',
  'apps/sales/templates'
],

function (_, Marionette, templates) {

  return Marionette.ItemView.extend({

    template: _.template(templates.tabs),

    setCurrent: function(appName) {
      $('.nav-pills a[href="#' + appName + '"]').tab('show');
    }

  });

});