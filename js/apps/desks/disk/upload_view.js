define([
  'underscore',
  'marionette',
  'text!apps/desks/disk/tmpl/form.html',
], function(_, Marionette, FormTemplate) {

  return Marionette.ItemView.extend({

    className: "modal-dialog",

    template: _.template(FormTemplate),

    templateHelpers: {
      getTitle: function() {
        return (this.id ? '新建文件夹' : '上传文件'); //TODO 判断
      }
    },

    triggers: {
      'submit': 'file:save'
    }

  });

});