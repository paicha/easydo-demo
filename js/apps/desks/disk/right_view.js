define([
  'underscore',
  'marionette',
  'text!apps/desks/disk/tmpl/right.html',
], function(_, Marionette, RightTemplate) {

  return Marionette.ItemView.extend({

    className: "col-sm-2",

    template: _.template(RightTemplate),

    triggers: {
      'click .uploadFile': 'file:upload',
      'click .createFolder': 'file:createFolder'
    }

  });

});