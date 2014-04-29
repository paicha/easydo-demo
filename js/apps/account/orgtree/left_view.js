define([
  'underscore',
  'marionette',
], function(_, Marionette) {

  return Marionette.ItemView.extend({

    template: _.template('<div>导航树<div id="orgtree"></div></div>'),
  });

});