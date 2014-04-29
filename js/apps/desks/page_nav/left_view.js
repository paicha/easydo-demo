define([
  'underscore',
  'marionette',
  'text!apps/desks/page_nav/tmpl/left.html',
], function(_, Marionette, LeftTemplates) {

  return Marionette.ItemView.extend({

    template: _.template(LeftTemplates),

    setCurrent: function(appName) {
      appName = appName.replace(".", "-");
      $('#' + appName).tab('show');
    }

  });

});