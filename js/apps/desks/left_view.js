define([
  'underscore',
  'marionette',
  'text!apps/desks/tmpl/left.html',
], function(_, Marionette, LeftTemplates) {

  return Marionette.ItemView.extend({

    className: "col-sm-2",

    template: _.template(LeftTemplates),

    setCurrent: function(appName) {
      appName = appName.replace(".", "-");
      $('#' + appName).tab('show');
    }

  });

});