define([
  'underscore',
  'marionette',
  'apps/desks/todo/templates',
],

function (_, Marionette, templates) {

  return Marionette.ItemView.extend({

    className: "col-sm-8",

    template: _.template(templates.content),

  });

});