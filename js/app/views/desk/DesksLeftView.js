define([
  'underscore',
  'marionette',
  'templates',
  'vent'
],

function (_, Marionette, templates, vent) {

  return Marionette.ItemView.extend({

    /*className: "modal-dialog",*/

    template: _.template(templates.app.left),

    triggers: {
      // FileController is listening
      'submit' : 'file:save'
    }

  });

});