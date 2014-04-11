define(['underscore', 'marionette', 'templates'], function(_, Marionette, templates) {

  return Marionette.ItemView.extend({
    /*className: 'container span8 home',*/
    
    template: _.template(templates.nav.right),


    triggers:  {
      // UserController is listening
      'click .delete' : 'file:delete'
    },


    initialize: function (options) {
      _.bindAll(this);
    }

  });

});
