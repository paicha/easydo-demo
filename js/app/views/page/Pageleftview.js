define([
  'underscore',
  'marionette',
  'templates',
  'vent'
],

function (_, Marionette, templates, vent) {

  return Marionette.ItemView.extend({

    className: "col-sm-2",

    template: _.template(templates.app.left),

  });

});