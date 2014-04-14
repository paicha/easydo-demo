define([
  'underscore',
  'marionette',
  'text!apps/account/tmpl/tabs.html'
], function(_, Marionette, TabsTemplates) {

  return Marionette.ItemView.extend({

    template: _.template(TabsTemplates),

    setCurrent: function(appName) {
      $('#tabs-' + appName).tab('show');
    }

  });

});