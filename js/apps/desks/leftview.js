define([
  'underscore',
  'marionette',
  'apps/desks/templates',
],

function (_, Marionette, templates) {

  return Marionette.ItemView.extend({

    className: "col-sm-2",

    template: _.template(templates.left),

    setCurrent: function(appName) {
      $('#' + appName).tab('show');
    }

  });

});