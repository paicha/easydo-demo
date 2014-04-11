define([
  'underscore',
  'marionette',
  'templates',
  'vent'
],

function (_, Marionette, templates, vent) {

  return Marionette.ItemView.extend({

    className: "placeholder",

    template: _.template(''),

  });

});