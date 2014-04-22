define([
  'underscore',
  'marionette',
], function(_, Marionette) {

  return Marionette.ItemView.extend({

    template: _.template("组织结构-调整或添加系统的部门和组，完善系统的组织结构。"),
  });

});