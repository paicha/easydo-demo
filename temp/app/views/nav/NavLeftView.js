define(['underscore', 'marionette', 'templates'], function(_, Marionette, templates) {

  return Marionette.ItemView.extend({
    
    template: _.template(templates.nav.left),

    initialize: function (options) {
      _.bindAll(this);
    }

  });

});
