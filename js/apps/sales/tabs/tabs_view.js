define([
  'underscore',
  'marionette',
  'text!apps/sales/tabs/tmpl/tabs.html'
], function(_, Marionette, TabsTemplate) {

  return Marionette.ItemView.extend({

    template: _.template(TabsTemplate),

    setCurrent: function(appName) {
      appName = appName.replace(".", "-");
      $('#tabs-' + appName).tab('show');
    }

  });

});