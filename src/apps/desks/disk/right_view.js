// Generated by CoffeeScript 1.7.1
define(['underscore', 'marionette', 'text!apps/desks/disk/tmpl/right.html'], function(_, Marionette, RightTemplate) {
  return Marionette.ItemView.extend({
    template: _.template(RightTemplate),
    triggers: {
      'click .uploadFile': 'file:upload',
      'click .createFolder': 'file:createFolder'
    }
  });
});