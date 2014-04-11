define([
  'underscore',
  'marionette',
  'apps/sales/case/templates',
],

function (_, Marionette, templates) {

  return Marionette.ItemView.extend({

    template: _.template(templates.content),
  });

});