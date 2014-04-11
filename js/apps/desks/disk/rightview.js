define([
  'underscore',
  'marionette',
  'apps/desks/disk/templates',
],

function (_, Marionette, templates) {

  return Marionette.ItemView.extend({

    className: "col-sm-2",

    template: _.template(templates.right),

    triggers:  {
      'click .uploadFile'   : 'file:upload',
      'click .createFolder' : 'file:createFolder'
    }

  });

});